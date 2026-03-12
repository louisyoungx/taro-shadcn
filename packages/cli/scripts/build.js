const path = require("path");
const fs = require("fs-extra");
const esbuild = require("esbuild");

async function main() {
  const pkgRoot = path.resolve(__dirname, "..");
  const distDir = path.join(pkgRoot, "dist");

  await fs.remove(distDir);
  await fs.ensureDir(distDir);

  await esbuild.build({
    entryPoints: [path.join(pkgRoot, "src", "index.ts")],
    outfile: path.join(distDir, "index.js"),
    platform: "node",
    format: "cjs",
    target: ["node18"],
    bundle: false,
    sourcemap: false,
    banner: {
      js: "#!/usr/bin/env node",
    },
    logLevel: "info",
  });

  await fs.chmod(path.join(distDir, "index.js"), 0o755);

  const workspaceRoot = path.resolve(pkgRoot, "..", "..");
  const readmeSrc = path.join(workspaceRoot, "README.md");
  const readmeDest = path.join(pkgRoot, "README.md");
  if (!(await fs.pathExists(readmeSrc))) {
    throw new Error(`README.md not found: ${readmeSrc}`);
  }
  await fs.copy(readmeSrc, readmeDest);

  const docsRoot = path.resolve(pkgRoot, "..", "docs", "src");
  const registrySrc = path.join(docsRoot, "components", "ui");
  const registryDest = path.join(distDir, "registry", "ui");
  if (!(await fs.pathExists(registrySrc))) {
    throw new Error(`Registry source not found: ${registrySrc}`);
  }
  await fs.copy(registrySrc, registryDest);

  const utilsTemplateSrc = path.join(docsRoot, "lib", "utils.ts");
  const utilsTemplateDest = path.join(distDir, "templates", "utils.ts");
  if (!(await fs.pathExists(utilsTemplateSrc))) {
    throw new Error(`utils.ts template not found: ${utilsTemplateSrc}`);
  }
  await fs.ensureDir(path.dirname(utilsTemplateDest));
  await fs.copy(utilsTemplateSrc, utilsTemplateDest);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
