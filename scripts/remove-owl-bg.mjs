import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "assets", "images");
const input = join(root, "hero-owl-source.jpg");
const output = join(root, "hero-owl.png");

function idx(x, y, width) {
  return y * width + x;
}

function lum(data, i) {
  const o = i * 4;
  return 0.2126 * data[o] + 0.7152 * data[o + 1] + 0.0722 * data[o + 2];
}

function chroma(data, i) {
  const o = i * 4;
  return Math.max(data[o], data[o + 1], data[o + 2]) - Math.min(data[o], data[o + 1], data[o + 2]);
}

function isBackgroundPixel(data, i) {
  const o = i * 4;
  const r = data[o];
  const g = data[o + 1];
  const b = data[o + 2];
  const l = lum(data, i);
  const c = chroma(data, i);

  if (r >= 248 && g >= 248 && b >= 248) return true;
  if (l >= 242 && c <= 12) return true;
  if (l >= 235 && c <= 8) return true;
  return false;
}

function removeBackground(data, width, height) {
  const visited = new Uint8Array(width * height);
  const stack = [];

  function push(x, y) {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = idx(x, y, width);
    if (visited[i]) return;
    visited[i] = 1;
    if (isBackgroundPixel(data, i)) stack.push(i);
  }

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (stack.length) {
    const i = stack.pop();
    data[i * 4 + 3] = 0;
    const x = i % width;
    const y = (i / width) | 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  for (let pass = 0; pass < 3; pass++) {
    const copy = Buffer.from(data);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const i = idx(x, y, width);
        const o = i * 4;
        if (copy[o + 3] === 0) continue;
        let near = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (copy[idx(x + dx, y + dy, width) * 4 + 3] === 0) near += 1;
          }
        }
        if (near >= 2 && lum(data, i) > 230 && chroma(data, i) < 16) {
          data[o + 3] = 0;
        }
      }
    }
  }
}

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
removeBackground(data, info.width, info.height);

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .trim({ threshold: 10 })
  .resize({ width: 900, kernel: sharp.kernel.lanczos3, withoutEnlargement: true })
  .png({ compressionLevel: 9, force: true })
  .toFile(output);

const meta = await sharp(output).metadata();
console.log(`Wrote ${output} ${meta.width}x${meta.height}`);
