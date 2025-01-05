import { NextResponse } from "next/server";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { ClientSecretCredential } from "@azure/identity";
import { PrismaClient } from "@prisma/client";
import "isomorphic-fetch";

// Define error interface
interface GraphError {
  message: string;
  code?: string;
  statusCode?: number;
  body?: unknown;
}

if (
  !process.env.AZURE_TENANT_ID ||
  !process.env.AZURE_CLIENT_ID ||
  !process.env.AZURE_CLIENT_SECRET
) {
  throw new Error(
    "Missing required Azure credentials in environment variables"
  );
}

const credential = new ClientSecretCredential(
  process.env.AZURE_TENANT_ID,
  process.env.AZURE_CLIENT_ID,
  process.env.AZURE_CLIENT_SECRET
);

const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: ["https://graph.microsoft.com/.default"],
});

const graphClient = Client.initWithMiddleware({ authProvider });

// Initialize PrismaClient
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Verify environment variables
    if (
      !process.env.AZURE_TENANT_ID ||
      !process.env.AZURE_CLIENT_ID ||
      !process.env.AZURE_CLIENT_SECRET
    ) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { companyName, email, message } = body;

    // First, store in database
    let submission;
    try {
      // Verify Prisma connection
      await prisma.$connect();

      submission = await prisma.contactSubmission.create({
        data: {
          companyName,
          email,
          message,
          status: "pending",
        },
      });
    } catch (dbError) {
      throw new Error(
        `Failed to store submission in database: ${
          dbError instanceof Error ? dbError.message : "Unknown error"
        }`
      );
    } finally {
      // Always disconnect after database operations
      await prisma.$disconnect();
    }

    // Verify email configuration
    if (!process.env.SENDER_EMAIL || !process.env.NOTIFICATION_EMAIL) {
      throw new Error("Email configuration is missing");
    }

    try {
      // Send notification email to admin
      console.log(
        "Sending notification email to:",
        process.env.NOTIFICATION_EMAIL
      );
      await graphClient
        .api(`/users/${process.env.SENDER_EMAIL}/sendMail`)
        .post({
          message: {
            subject: `New Contact Form Submission from ${companyName}`,
            importance: "normal",
            body: {
              contentType: "HTML",
              content: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
                  New Contact Form Submission
                </h2>
                <div style="margin: 20px 0;">
                  <p><strong>Company:</strong> ${companyName}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Message:</strong></p>
                  <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
                </div>
                <div style="color: #666; font-size: 12px; margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
                  Sent from TryMyLook.com
                </div>
              </div>
            `,
            },
            toRecipients: [
              {
                emailAddress: {
                  address: process.env.NOTIFICATION_EMAIL,
                },
              },
            ],
            from: {
              emailAddress: {
                address: process.env.SENDER_EMAIL,
              },
            },
            replyTo: [
              {
                emailAddress: {
                  address: process.env.SENDER_EMAIL,
                },
              },
            ],
            internetMessageHeaders: [
              {
                name: "X-Priority",
                value: "3",
              },
              {
                name: "X-MSMail-Priority",
                value: "Normal",
              },
              {
                name: "X-Mailer",
                value: "Microsoft Graph API",
              },
              {
                name: "X-List-Unsubscribe",
                value: `<mailto:${process.env.SENDER_EMAIL}?subject=unsubscribe>`,
              },
            ],
          },
          saveToSentItems: true,
        });

      // Send confirmation email to user
      try {
        await graphClient
          .api(`/users/${process.env.SENDER_EMAIL}/sendMail`)
          .post({
            message: {
              subject: "Thank you for contacting TryMyLook AI",
              importance: "normal",
              body: {
                contentType: "HTML",
                content: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
                    Thank You for Contacting Us
                  </h2>
                  <div style="margin: 20px 0;">
                    <p>Dear ${companyName},</p>
                    <p>Thank you for reaching out to TryMyLook AI. We have received your message and will get back to you as soon as possible.</p>
                    <p>Here's a copy of your message:</p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
                      ${message}
                    </div>
                    <p>Best regards,<br>The TryMyLook AI Team</p>
                  </div>
                  <div style="color: #666; font-size: 12px; margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
                    This is an automated response. Please do not reply to this email.
                  </div>
                </div>
              `,
              },
              toRecipients: [
                {
                  emailAddress: {
                    address: email,
                  },
                },
              ],
              from: {
                emailAddress: {
                  address: process.env.SENDER_EMAIL,
                },
              },
              replyTo: [
                {
                  emailAddress: {
                    address: process.env.SENDER_EMAIL,
                  },
                },
              ],
              internetMessageHeaders: [
                {
                  name: "X-Priority",
                  value: "3",
                },
                {
                  name: "X-MSMail-Priority",
                  value: "Normal",
                },
                {
                  name: "X-Mailer",
                  value: "Microsoft Graph API",
                },
                {
                  name: "X-List-Unsubscribe",
                  value: `<mailto:${process.env.SENDER_EMAIL}?subject=unsubscribe>`,
                },
              ],
            },
            saveToSentItems: true,
          });
        // console.log("Confirmation email sent successfully");
      } catch (userEmailError) {
        console.error("Failed to send confirmation email to user:", {
          error: userEmailError,
          recipient: email,
        });
        // Don't throw error for user email failure, just log it
        await prisma.contactSubmission.update({
          where: { id: submission.id },
          data: { status: "user_email_failed" },
        });
      }

      // console.log("Email processing completed");
      return NextResponse.json({
        success: true,
        message: "Thank you for your message. We will get back to you soon!",
      });
    } catch (error: unknown) {
      const graphError = error as GraphError;
      console.error("Contact form error details:", {
        message: graphError.message,
        code: graphError.code,
        statusCode: graphError.statusCode,
        details: graphError.body,
      });

      // Update submission status
      await prisma.contactSubmission.update({
        where: { id: submission.id },
        data: { status: "notification_email_failed" },
      });

      return NextResponse.json(
        {
          error:
            "We received your message but there was an issue with email notification. Our team will still process your request.",
          details:
            process.env.NODE_ENV === "development"
              ? graphError.message
              : undefined,
        },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    const graphError = error as GraphError;

    console.error("Contact form error details:", {
      message: graphError.message,
      code: graphError.code,
      statusCode: graphError.statusCode,
      details: graphError.body,
    });

    return NextResponse.json(
      {
        error: "Failed to process contact form. Please try again later.",
        details:
          process.env.NODE_ENV === "development"
            ? graphError.message
            : undefined,
      },
      { status: 500 }
    );
  }
}
