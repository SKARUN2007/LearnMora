import fs from 'fs';
import path from 'path';

// Load raw file
const rawPath = path.resolve(__dirname, '../src/lib/generatedCourses.ts');
let content = fs.readFileSync(rawPath, 'utf8');

  // Load the module (since ts-node might fail, we'll parse it as a massive string or convert it via JS)
  // Instead of complex AST, let's just use regex to fix the "isFree": true/false mismatches!
  
  let fixedContent = content.replace(/("price":\s*"\$[\d,]+",\s*\n\s*"roi":\s*"[\d\.]+%?",\s*\n\s*"isFree":\s*)true/g, '$1false');
  fixedContent = fixedContent.replace(/("price":\s*"FREE",\s*\n\s*"roi":\s*"[\d\.]+%?",\s*\n\s*"isFree":\s*)false/g, '$1true');
  
  if (fixedContent !== content) {
    fs.writeFileSync(rawPath, fixedContent, 'utf8');
    console.log("Data anomalies successfully fixed!");
  } else {
    console.log("No anomalies found by Regex.");
  }

