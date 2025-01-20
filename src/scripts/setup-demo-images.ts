import fs from 'fs';
import path from 'path';

const ensureDirectoryExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Setup directories
const publicDir = path.join(process.cwd(), 'public');
const imagesDir = path.join(publicDir, 'images');
const iconsDir = path.join(imagesDir, 'icons');
const apparelDir = path.join(imagesDir, 'apparel', 'female');

// Ensure directories exist
[publicDir, imagesDir, iconsDir, apparelDir].forEach(ensureDirectoryExists);

// Copy icons
['speed.svg', 'savings.svg', 'quality.svg'].forEach(icon => {
  const source = path.join(__dirname, '..', 'assets', 'icons', icon);
  const dest = path.join(iconsDir, icon);
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, dest);
  }
});

console.log('✓ Demo assets setup complete'); 