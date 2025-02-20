import { NextRequest, NextResponse } from "next/server";
import { virtualTryOn, imageToVideo } from "../../utils/KlingApi";
import { auth } from "@/auth";
import { createDemo } from "@/app/actions/demo";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const requestType = formData.get("requestType") as string;

    // Check authentication and rate limit for try-on requests
    if (requestType === "tryon") {
      const session = await auth();
      if (!session?.user?.email) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }

      // Add logging to debug the issue
      console.log("Session user:", session.user.email);
      
      // Check rate limit and create demo record
      const demoResult = await createDemo();
      console.log("Demo result:", demoResult);

      if (!demoResult.success) {
        return NextResponse.json(
          {
            error: demoResult.error,
            contactSales: demoResult.isRateLimit,
          },
          {
            status: demoResult.isRateLimit ? 429 : 500,
            headers: {
              "X-RateLimit-Remaining": String(demoResult.remainingTries || 0),
            },
          }
        );
      }

      const modelImage = formData.get("modelImage") as Blob;
      const apparelImage = formData.get("apparelImage") as Blob;

      // console.log("Model image size:", modelImage?.size);
      // console.log("Apparel image size:", apparelImage?.size);

      if (!modelImage || !apparelImage) {
        return NextResponse.json(
          { error: "Missing required images" },
          { status: 400 }
        );
      }

      try {
        // console.log("Calling virtualTryOn function");
        const result = await virtualTryOn(modelImage, apparelImage);
        // console.log("Virtual try-on result:", result);

        // Return result with remaining tries
        return NextResponse.json(
          { 
            result,
            remainingTries: demoResult.remainingTries 
          },
          {
            headers: {
              "X-RateLimit-Remaining": String(demoResult.remainingTries || 0),
            },
          }
        );
      } catch (error) {
        console.error("Virtual try-on failed:", error);
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);

          if (error.message.includes("resource pack exhausted")) {
            return NextResponse.json(
              {
                error:
                  "API usage limit reached. Please try again later or contact support for an upgrade.",
                code: "RESOURCE_EXHAUSTED",
              },
              { status: 429 }
            );
          }

          return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(
          { error: "An unexpected error occurred" },
          { status: 500 }
        );
      }
    } else if (requestType === "img2video") {
      const image = formData.get("image") as Blob;
      const prompt = formData.get("prompt") as string;
      const negativePrompt = formData.get("negative_prompt") as string;
      const cfgScale = parseFloat(formData.get("cfg_scale") as string);
      const mode = formData.get("mode") as "std" | "pro";
      const duration = formData.get("duration") as "5" | "10";

      // console.log("Image size:", image?.size);
      // console.log("Prompt:", prompt);
      // console.log("Negative Prompt:", negativePrompt);
      // console.log("CFG Scale:", cfgScale);
      // console.log("Mode:", mode);
      // console.log("Duration:", duration);

      if (!image || !prompt) {
        return NextResponse.json(
          { error: "Missing required data" },
          { status: 400 }
        );
      }

      try {
        // console.log("Calling imageToVideo function");
        const result = await imageToVideo(
          image,
          prompt,
          cfgScale,
          mode,
          duration,
          negativePrompt
        );
        // console.log("Image to video result:", result);
        return NextResponse.json({ result });
      } catch (error) {
        console.error("Image to video generation failed:", error);
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(
          { error: "An unexpected error occurred" },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid request type" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Try-on API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}
