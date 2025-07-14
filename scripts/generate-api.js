const { execSync } = require("child_process");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

const url = process.env.BACKEND_OPENAPI_URL;
if (!url) throw new Error("BACKEND_OPENAPI_URL not set in .env.local");

execSync(`npx openapi --input ${url} --output src/api/generated`, {
  stdio: "inherit",
});
