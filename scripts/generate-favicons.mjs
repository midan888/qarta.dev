import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const svgSource = readFileSync(join(publicDir, "logo-icon.svg"));

async function generate() {
  // Apple touch icon (180x180 PNG)
  await sharp(svgSource)
    .resize(180, 180)
    .png()
    .toFile(join(publicDir, "apple-touch-icon.png"));
  console.log("Created apple-touch-icon.png (180x180)");

  // Favicon PNG (32x32)
  await sharp(svgSource)
    .resize(32, 32)
    .png()
    .toFile(join(publicDir, "favicon-32x32.png"));
  console.log("Created favicon-32x32.png (32x32)");

  // Favicon PNG (16x16)
  await sharp(svgSource)
    .resize(16, 16)
    .png()
    .toFile(join(publicDir, "favicon-16x16.png"));
  console.log("Created favicon-16x16.png (16x16)");

  // favicon.ico — use a 48x48 PNG embedded as ICO
  // ICO format: header + directory entry + PNG data
  const png48 = await sharp(svgSource).resize(48, 48).png().toBuffer();
  const ico = createIco([png48], [48]);
  writeFileSync(join(publicDir, "favicon.ico"), ico);
  console.log("Created favicon.ico (48x48)");

  // OG-ready icon (512x512 PNG)
  await sharp(svgSource)
    .resize(512, 512)
    .png()
    .toFile(join(publicDir, "icon-512x512.png"));
  console.log("Created icon-512x512.png (512x512)");

  // Also create a 192x192 for PWA
  await sharp(svgSource)
    .resize(192, 192)
    .png()
    .toFile(join(publicDir, "icon-192x192.png"));
  console.log("Created icon-192x192.png (192x192)");
}

function createIco(pngBuffers, sizes) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dataOffset = headerSize + dirEntrySize * numImages;

  // ICO header
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = ICO
  header.writeUInt16LE(numImages, 4);

  const dirEntries = [];
  let currentOffset = dataOffset;

  for (let i = 0; i < numImages; i++) {
    const entry = Buffer.alloc(dirEntrySize);
    const size = sizes[i] >= 256 ? 0 : sizes[i];
    entry.writeUInt8(size, 0); // width
    entry.writeUInt8(size, 1); // height
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(pngBuffers[i].length, 8); // size
    entry.writeUInt32LE(currentOffset, 12); // offset
    dirEntries.push(entry);
    currentOffset += pngBuffers[i].length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
}

generate().catch(console.error);
