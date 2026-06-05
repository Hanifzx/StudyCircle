import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputSvgPath = join(__dirname, '../public/icon.svg');
const outputDir = join(__dirname, '../public');

const sizes = [
  { size: 192, name: 'pwa-192x192.png' },
  { size: 512, name: 'pwa-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' }
];

async function generateIcons() {
  console.log('Generating PWA icons...');
  
  if (!fs.existsSync(inputSvgPath)) {
    console.error(`Error: Could not find input SVG at ${inputSvgPath}`);
    process.exit(1);
  }

  try {
    for (const { size, name } of sizes) {
      const outputPath = join(outputDir, name);
      
      await sharp(inputSvgPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 15, g: 15, b: 22, alpha: 1 } // #0F0F16 dark background
        })
        .png()
        .toFile(outputPath);
        
      console.log(`Generated ${name} (${size}x${size})`);
    }
    
    console.log('PWA icons generation complete! ✅');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
