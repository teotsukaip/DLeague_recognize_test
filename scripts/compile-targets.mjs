import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  const filePath = resolve(root, "." + decodeURIComponent(url.pathname));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end();
    return;
  }
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});

await new Promise((resolvePromise) => server.listen(8765, "127.0.0.1", resolvePromise));

const browser = await chromium.launch({
  headless: true,
  args: ["--use-gl=angle", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage();
page.on("console", (msg) => console.log("[browser]", msg.text()));
page.on("pageerror", (error) => console.error("[pageerror]", error.message));

const [download] = await Promise.all([
  page.waitForEvent("download", { timeout: 600000 }),
  page.goto("http://127.0.0.1:8765/compile.html?auto=1", { waitUntil: "networkidle", timeout: 120000 }),
]);

const dest = resolve(root, "targets.mind");
await download.saveAs(dest);
console.log("saved", dest);

await browser.close();
server.close();
