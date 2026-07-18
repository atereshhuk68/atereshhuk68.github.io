import type { AstroIntegrationLogger } from "astro";
import { readFileSync, writeFileSync } from "fs";
import { glob } from "tinyglobby";
import { fileURLToPath } from "url";

export default function moveIslandsStyle() {
  return {
    name: "move-islands-style",
    hooks: {
      "astro:build:done": async ({
        dir,
        logger,
      }: {
        dir: URL;
        logger: AstroIntegrationLogger;
      }) => {
        const distPath = fileURLToPath(dir);

        const htmlFiles = await glob(`${distPath}/**/*.html`);

        const styleRegex =
          /<style>astro-island,astro-slot,astro-static-slot\{display:contents\}<\/style>/g;

        htmlFiles.forEach((file) => {
          let html = readFileSync(file, "utf-8");
          const match = html.match(styleRegex);

          if (match) {
            html = html.replace(styleRegex, "");

            html = html.replace("</head>", `  ${match[0]}\n</head>`);

            writeFileSync(file, html, "utf-8");
            logger.info(`Moved islands style in <head> for: ${file}`);
          }
        });
      },
    },
  };
}
