#!/usr/bin/env node

/**
 * Generate icon files during prebuild to ensure they always exist
 * This runs before the Expo build process
 */

const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../assets/images');

// Ensure assets directory exists
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Check if icon files exist, if not create placeholder
const iconFiles = [
  'android-icon-foreground.png',
  'android-icon-background.png',
  'android-icon-monochrome.png'
];

iconFiles.forEach(file => {
  const filePath = path.join(assetsDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Missing ${file}, creating placeholder...`);
    // Create a minimal valid PNG file (1x1 transparent)
    const minimalPng = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
      0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4,
      0x89, 0x00, 0x00, 0x00, 0x0A, 0x49, 0x44, 0x41, // IDAT chunk
      0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00,
      0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, // IEND chunk
      0x42, 0x60, 0x82
    ]);
    fs.writeFileSync(filePath, minimalPng);
    console.log(`Created ${file}`);
  } else {
    console.log(`${file} exists`);
  }
});

console.log('Icon generation complete');
