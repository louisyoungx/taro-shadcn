const path = require("path");
const fs = require("fs-extra");

async function main() {
  const pkgRoot = path.resolve(__dirname, "..");
  const readmePath = path.join(pkgRoot, "README.md");
  if (await fs.pathExists(readmePath)) {
    await fs.remove(readmePath);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
