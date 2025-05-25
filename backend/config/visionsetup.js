// visionSetup.js

import path from "path";
import { fileURLToPath } from "url";
import vision from "@google-cloud/vision";

// For ES modules, __dirname is not defined, so we define it:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the path to your service account JSON key
const keyPath = path.join(
  __dirname,
  "../moonlit-caster-460814-p4-52b9030f7175.json"
);

const client = new vision.ImageAnnotatorClient({
  keyFilename: keyPath,
});

export default client;
