const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PHOTOS_DIR = path.join(__dirname, "..", "public", "photos");

async function compressImages() {
  const files = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (/\.(webp|jpg|jpeg|png)$/i.test(entry.name)) files.push(fullPath);
    }
  }
  walk(PHOTOS_DIR);

  let totalSaved = 0;
  let compressed = 0;

  for (const file of files) {
    const stat = fs.statSync(file);
    if (stat.size < 200 * 1024) continue; // skip files under 200KB

    const ext = path.extname(file).toLowerCase();
    const originalSize = stat.size;
    const tempFile = file + ".tmp";

    try {
      let pipeline = sharp(file);
      if (ext === ".png") {
        pipeline = pipeline.png({ quality: 80, palette: true });
      } else if (ext === ".webp") {
        pipeline = pipeline.webp({ quality: 80 });
      } else {
        pipeline = pipeline.jpeg({ quality: 80 });
      }
      await pipeline.toFile(tempFile);
      const newSize = fs.statSync(tempFile).size;
      if (newSize < originalSize) {
        fs.copyFileSync(tempFile, file);
        const saved = originalSize - newSize;
        totalSaved += saved;
        compressed++;
        console.log(
          `Compressed: ${path.relative(PHOTOS_DIR, file)} — ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (saved ${(saved / 1024).toFixed(1)}KB)`
        );
      } else {
        console.log(`Skipped (no gain): ${path.relative(PHOTOS_DIR, file)}`);
      }
      fs.unlinkSync(tempFile);
    } catch (err) {
      console.error(`Error processing ${file}: ${err.message}`);
    }
  }

  console.log(`\nDone. Compressed ${compressed} images, saved ${(totalSaved / 1024).toFixed(1)}KB total.`);
}

compressImages().catch(console.error);
