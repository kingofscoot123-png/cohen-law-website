import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "assets", "images");

async function removeDarkBackground(input, output, threshold = 42) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    if (max <= threshold) {
      data[i + 3] = 0;
      continue;
    }

    if (max - min < 18 && max <= threshold + 28) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(output);

  console.log(`Wrote ${output}`);
}

await removeDarkBackground(
  join(root, "logo-cohen-source.png"),
  join(root, "logo-cohen.png")
);

await removeDarkBackground(
  join(root, "logo-cohen-mark-source.png"),
  join(root, "logo-cohen-mark.png"),
  20
);
