import fs from "fs";
import path from "path";

function walk(dir: string) {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith(".module.css") || file.endsWith(".css")) {
        results.push(file);
      }
    }
  });
  return results;
}

const cssFiles = walk(path.join(__dirname, "../src"));
let replaced = 0;

cssFiles.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");
  if (content.includes("max-width: 1440px") || content.includes("max-width: 1200px") || content.includes("max-width: 1400px")) {
    content = content.replace(/max-width:\s*(1440|1200|1400)px/g, "max-width: 1280px");
    fs.writeFileSync(file, content);
    replaced++;
  }
});

console.log(`Global container sync complete. Updated ${replaced} files to max-width: 1280px.`);
