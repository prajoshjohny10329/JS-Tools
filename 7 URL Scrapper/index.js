const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const xml2js = require("xml2js");

// ========== PART 1: DOWNLOAD A SINGLE PAGE ========== //
async function downloadFile(fileUrl, outputPath) {
  if (fs.existsSync(outputPath)) {
    console.log(`Skipped (already exists): ${outputPath}`);
    return;
  }

  try {
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, response.data);
    console.log(`Downloaded: ${fileUrl}`);
  } catch (error) {
    console.error(`❌ Error downloading ${fileUrl}:`, error.message);
  }
}

async function downloadPage(url, outputBase = "downloaded") {
  console.log("🌐 Downloading page:", url);
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const baseUrl = new URL(url);

  // Determine output HTML filename
  const pathname = baseUrl.pathname;
  let htmlFileName = "index.html";
  if (pathname.endsWith(".html")) {
    htmlFileName = path.basename(pathname);
  }

  const outputDir = outputBase;
  fs.mkdirSync(outputDir, { recursive: true });

  const assets = [];
  $("link[href], script[src], img[src]").each((_, el) => {
    const attr = el.name === "link" ? "href" : "src";
    const src = $(el).attr(attr);
    if (src) {
      try {
        const assetUrl = new URL(src, baseUrl).href;
        const assetPath = path.join(outputBase, assetUrl.replace(baseUrl.origin, ""));
        assets.push({ url: assetUrl, path: assetPath });

        const relativePath = path.relative(outputDir, assetPath);
        $(el).attr(attr, relativePath);
      } catch (err) {
        console.warn(`⚠️ Skipping malformed URL: ${src}`);
      }
    }
  });

  const htmlOutputPath = path.join(outputDir, htmlFileName);
  fs.writeFileSync(htmlOutputPath, $.html());
  console.log(`✅ Saved HTML to: ${htmlOutputPath}`);

  for (const asset of assets) {
    await downloadFile(asset.url, asset.path);
  }
}

// ========== PART 2: PARSE SITEMAP AND LOOP ========== //
async function parseSitemap(sitemapPath) {
  let xmlData = "";

  if (sitemapPath.startsWith("http")) {
    const res = await axios.get(sitemapPath);
    xmlData = res.data;
  } else {
    xmlData = fs.readFileSync(sitemapPath, "utf8");
  }

  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xmlData);
  const urls = result.urlset.url.map((u) => u.loc[0]);

  return urls;
}

// ========== PART 3: MAIN LOGIC ========== //
async function main() {
  const sitemapPath = "input/sitemap.xml"; // or use URL like "https://example.com/sitemap.xml"
  console.log("📄 Reading sitemap:", sitemapPath);

  try {
    const urls = await parseSitemap(sitemapPath);
    console.log(`🔗 Found ${urls.length} pages in sitemap`);

    console.log(urls);
    

    for (const url of urls) {
      await downloadPage(url);
      console.log(` 🎉 ${url}  downloaded successfully.`);
      
    }

    console.log("🎉 All pages downloaded successfully.");
  } catch (err) {
    console.error("❌ Error processing sitemap:", err.message);
  }
}

main();
