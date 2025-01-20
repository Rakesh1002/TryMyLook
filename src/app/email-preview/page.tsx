import { Metadata } from "next";

interface EmailTemplateProps {
  recipientName?: string;
}

const getEmailTemplate = ({ recipientName = "Fashion Brand Leader" }: EmailTemplateProps) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Transform Your Fashion Photography with TryMyLook AI</title>
  <meta name="subject" content="🚀 Cut Your Product Photography Costs by 90% | AI-Powered On-Model Photos">
  <meta name="description" content="Transform flatlay images into professional on-model photos instantly. No models, no studio, no waiting. Starting at just ₹100/image.">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
      color: #374151;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    .header {
      text-align: center;
      padding: 40px 0;
      background: linear-gradient(135deg, #4F46E5, #9333EA);
      color: white;
      border-radius: 8px 8px 0 0;
    }
    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 24px;
      padding: 0 20px;
    }
    .logo {
      height: 48px;
      width: 48px;
      margin-right: 12px;
    }
    .logo-text {
      font-size: 24px;
      font-weight: bold;
      color: white;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 40px 32px;
    }
    .image-comparison {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin: 32px 0;
      background: #f8fafc;
      padding: 20px;
      border-radius: 12px;
    }
    .image-comparison img {
      width: 45%;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin: 40px auto;
      max-width: 800px;
      padding: 0 16px;
    }
    .feature {
      text-align: center;
      padding: 20px 12px;
      background: #f8fafc;
      border-radius: 16px;
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 0; /* Prevent overflow */
    }
    .feature:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px -8px rgba(79, 70, 229, 0.15);
    }
    .feature img {
      width: min(64px, 15vw);
      height: min(64px, 15vw);
      margin-bottom: 16px;
    }
    .feature h3 {
      color: #4F46E5;
      margin: 0 0 8px 0;
      font-size: clamp(14px, 3vw, 20px);
      white-space: nowrap;
    }
    .feature p {
      color: #64748b;
      margin: 0;
      font-size: clamp(12px, 2.5vw, 16px);
      line-height: 1.4;
    }
    .comparison {
      margin: 32px 0;
      padding: 24px;
      background: #f8fafc;
      border-radius: 12px;
    }
    .comparison ul {
      list-style: none;
      padding: 0;
      margin: 16px 0;
    }
    .comparison li {
      margin: 12px 0;
      padding-left: 28px;
      position: relative;
    }
    .comparison li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #4F46E5;
      font-weight: bold;
    }
    .cta-button {
      display: inline-block;
      padding: 16px 32px;
      background: linear-gradient(135deg, #4F46E5, #9333EA);
      color: white;
      text-decoration: none;
      border-radius: 30px;
      font-weight: bold;
      text-align: center;
      margin: 24px 0;
      width: 200px;
      transition: transform 0.2s;
    }
    .cta-button:hover {
      transform: translateY(-2px);
    }
    .cta-container {
      text-align: center;
      margin: 32px 0;
    }
    .price-tag {
      background: linear-gradient(135deg, #4F46E5, #9333EA);
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      display: inline-block;
      margin: 16px 0;
      font-weight: bold;
    }
    .benefits-list {
      padding-left: 24px;
      margin: 16px 0;
    }
    .benefits-list li {
      margin: 8px 0;
      position: relative;
    }
    .benefits-list li:before {
      content: "•";
      color: #4F46E5;
      font-weight: bold;
      position: absolute;
      left: -20px;
    }
    .footer {
      text-align: center;
      padding: 24px;
      background: #f8fafc;
      border-radius: 0 0 8px 8px;
      margin-top: 40px;
    }
    .image-collage {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin: 40px 0;
      padding: 32px;
      background: #f8fafc;
      border-radius: 16px;
    }
    .collage-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin: 0 auto;
      max-width: 900px;
      width: 100%;
    }
    .collage-image {
      width: 100%;
      aspect-ratio: 3/4;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }
    .collage-image:hover {
      transform: scale(1.05);
    }
    .row-label {
      font-size: 16px;
      color: #4F46E5;
      margin: 0;
      text-align: center;
      font-weight: 600;
      letter-spacing: -0.5px;
    }
    .row-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  </style>
</head>
<body>
  <div style="display: none; max-height: 0px; overflow: hidden;">
    Transform flatlay images into professional on-model photos instantly. No models, no studio, no waiting. Starting at just ₹100/image. ✨
  </div>
  <div style="display: none; max-height: 0px; overflow: hidden;">
    ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
  </div>
  <div class="container">
    <div class="header">
      <div class="logo-container">
        <img src="https://trymylook.xyz/favicon-32x32.png" alt="" class="logo">
        <span class="logo-text">TryMyLook AI</span>
      </div>
      <h1 style="margin: 0; font-size: 30px; font-weight: 700; letter-spacing: -0.5px;">
        Transform Your Fashion Photography
      </h1>
      <p style="margin: 12px 0 0 0; font-size: 20px; opacity: 0.9;">
        Studio-Quality On-Model Photos in Minutes
      </p>
    </div>

    <div class="content">
      <p style="font-size: 18px;">Dear ${recipientName},</p>
      <br>
      <p>Are traditional photoshoots holding back your business growth? We're excited to introduce you to <strong>TryMyLook AI</strong> – your solution to creating professional on-model photography at a fraction of the cost and time.</p>

      <div class="image-comparison">
        <img src="https://trymylook.xyz/images/apparel/female/1.jpeg" alt="Before - Flatlay">
        <img src="https://trymylook.xyz/images/apparel/female/1_after_female.png" alt="After - On Model">
      </div>

      <div class="image-collage">
        <div class="row-container">
          <div class="row-label">Before - Flatlay Images</div>
          <div class="collage-row">
            <img src="https://trymylook.xyz/images/apparel/female/2.jpeg" alt="Flatlay Example 1" class="collage-image">
            <img src="https://trymylook.xyz/images/apparel/female/4.jpeg" alt="Flatlay Example 2" class="collage-image">
            <img src="https://trymylook.xyz/images/apparel/male/7.jpeg" alt="Flatlay Example 3" class="collage-image">
            <img src="https://trymylook.xyz/images/apparel/male/8.jpeg" alt="Flatlay Example 4" class="collage-image">
          </div>
        </div>

        <div class="row-container">
          <div class="row-label">After - AI Generated On-Model Photos</div>
          <div class="collage-row">
            <img src="https://trymylook.xyz/images/apparel/female/2_after_female.png" alt="On-Model Example 1" class="collage-image">
            <img src="https://trymylook.xyz/images/apparel/female/4_after_female.png" alt="On-Model Example 2" class="collage-image">
            <img src="https://trymylook.xyz/images/apparel/male/7_after_male.png" alt="On-Model Example 3" class="collage-image">
            <img src="https://trymylook.xyz/images/apparel/male/8_after_male.png" alt="On-Model Example 4" class="collage-image">
          </div>
        </div>
      </div>

      <p style="text-align: center; color: #64748b; font-style: italic; margin: 16px 0;">
        Transform any flatlay image into professional on-model photos instantly
      </p>

      <h2 style="text-align: center; color: #4F46E5; margin: 40px 0;">Why Choose TryMyLook AI?</h2>
      
      <div class="features-grid">
        <div class="feature">
          <img src="https://trymylook.xyz/images/icons/speed.png" alt="Speed">
          <h3>Lightning Fast</h3>
          <p>Get results in minutes, not days</p>
        </div>
        <div class="feature">
          <img src="https://trymylook.xyz/images/icons/savings.png" alt="Cost">
          <h3>Cost-Effective</h3>
          <p>Starting at just ₹100 per image</p>
        </div>
        <div class="feature">
          <img src="https://trymylook.xyz/images/icons/quality.png" alt="Quality">
          <h3>Studio Quality</h3>
          <p>Professional results every time</p>
        </div>
      </div>

      <div class="comparison">
        <h3 style="color: #4F46E5; margin-top: 0;">Transform Your Product Photography</h3>
        <ul>
          <li>Eliminate expensive model hiring costs</li>
          <li>No more studio rental fees</li>
          <li>Skip time-consuming scheduling</li>
          <li>Get instant revisions on demand</li>
          <li>Scale to unlimited products effortlessly</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <h3 style="color: #4F46E5;">🎥 NEW: 5-Second Video Generation</h3>
        <p>Transform static images into engaging videos perfect for social media!</p>
        <div class="price-tag">
          Starting at just ₹100 per image
        </div>
      </div>

      <div class="cta-container">
        <p style="font-weight: bold; color: #4F46E5;">Limited Time Launch Offer!</p>
        <a href="https://trymylook.xyz" class="cta-button">Try Demo Now</a>
      </div>

      <p style="font-weight: bold; margin-top: 40px;">Ready to revolutionize your fashion photography?</p>
      <p>Reply to this email to get:</p>
      <ul class="benefits-list">
        <li>Customized pricing packages for your needs</li>
        <li>Exclusive live demo walkthrough</li>
        <li>Dedicated integration support</li>
        <li>Special launch pricing</li>
      </ul>

      <p style="text-align: center; font-style: italic; margin-top: 32px;">
        Join leading brands who have already transformed their product photography with TryMyLook AI.
      </p>
    </div>

    <div class="footer">
      <p style="font-weight: bold; margin-bottom: 16px;">TryMyLook AI - Your AI Fashion Photography Partner</p>
      <p>
        <a href="https://trymylook.xyz" style="color: #4F46E5; text-decoration: none; margin: 0 10px;">Website</a> |
        <a href="mailto:contact@trymylook.xyz" style="color: #4F46E5; text-decoration: none; margin: 0 10px;">Contact Us</a>
      </p>
      <p style="font-size: 12px; color: #6B7280; margin-top: 16px;">
        © 2024 TryMyLook AI. All rights reserved.<br>
        Made with ❤️ in India
      </p>
      <p>
        You received this email because you signed up for TryMyLook AI updates. 
        <a href="{$unsubscribe_link}" style="color: #4F46E5; text-decoration: underline;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

export default function EmailPreview() {
  // For preview, we can pass a default name or get it from query params
  const emailTemplate = getEmailTemplate({ recipientName: "Fashion Brand Leader" });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div dangerouslySetInnerHTML={{ __html: emailTemplate }} />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "TryMyLook AI - Transform Your Fashion Photography",
  description: "Revolutionary AI-powered virtual try-on solution for fashion brands",
}; 