import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '../src/assets/site');
const outputDir = path.join(__dirname, '../src/assets/site/optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const mobileImages = [
  'mobile-01.png',
  'mobile-02.png',
  'mobile-03.png',
  'mobile-04.png'
];

async function optimizeImages() {
  for (const image of mobileImages) {
    const inputPath = path.join(imagesDir, image);
    const outputPath = path.join(outputDir, image.replace('.png', '.webp'));
    
    try {
      await sharp(inputPath)
        .resize(1200, 800, { // Resize to max needed size
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 80 }) // Convert to WebP with 80% quality
        .toFile(outputPath);
      
      console.log(`✅ Optimized: ${image} -> ${path.basename(outputPath)}`);
    } catch (error) {
      console.error(`❌ Error optimizing ${image}:`, error);
    }
  }
}

optimizeImages();