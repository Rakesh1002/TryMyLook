import fs from "fs";
import path from "path";
import sharp from "sharp";

const ensureDirectoryExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Setup directories
const publicDir = path.join(process.cwd(), "public");
const imagesDir = path.join(publicDir, "images");
const iconsDir = path.join(imagesDir, "icons");
const logoDir = path.join(imagesDir, "logo");

// Ensure directories exist
[publicDir, imagesDir, iconsDir, logoDir].forEach(ensureDirectoryExists);

// Copy app icon to logo directory
const appIconPath = path.join(publicDir, "android-chrome-512x512.png");
const logoPath = path.join(logoDir, "logo-white.png");
if (fs.existsSync(appIconPath)) {
  fs.copyFileSync(appIconPath, logoPath);
}

// Create icon SVGs and convert to PNG
const icons = {
  speed: `<svg width="128" height="128" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#EEF2FF"/>
    <path d="M12 8V12L15 15" stroke="#4F46E5" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4F46E5" stroke-width="2"/>
  </svg>`,
  savings: `<svg width="128" height="128" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#EEF2FF"/>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="#4F46E5" stroke-width="2"/>
    <path d="M12 16V17M12 7V14" stroke="#4F46E5" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
  quality: `<svg width="128" height="128" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#EEF2FF"/>
    <path d="M12 15L8.5 17L9.5 13L6.5 10.5L10.5 10L12 6.5L13.5 10L17.5 10.5L14.5 13L15.5 17L12 15Z" fill="#4F46E5"/>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4F46E5" stroke-width="2"/>
  </svg>`,
};

// Convert SVGs to PNGs
const convertToPng = async () => {
  for (const [name, svg] of Object.entries(icons)) {
    const svgBuffer = Buffer.from(svg);
    await sharp(svgBuffer)
      .resize(128, 128) // Larger size for better quality
      .png()
      .toFile(path.join(iconsDir, `${name}.png`));
  }
};

convertToPng()
  .then(() => {
    console.log("✓ Demo assets setup complete");
  })
  .catch(console.error);
