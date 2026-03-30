const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const workspaceRoot = path.resolve(__dirname, "..");
const cliRoot = path.join(workspaceRoot, "packages", "cli");
const cliPackageJsonPath = path.join(cliRoot, "package.json");
const validReleaseTypes = new Set(["patch", "minor", "major"]);

function readCliPackageJson() {
  return JSON.parse(fs.readFileSync(cliPackageJsonPath, "utf8"));
}

function run(command, args, cwd) {
  execFileSync(command, args, {
    cwd,
    stdio: "inherit",
    env: process.env,
  });
}

function isExplicitVersion(value) {
  return /^\d+\.\d+\.\d+(?:-[0-9A-Za-z-.]+)?(?:\+[0-9A-Za-z-.]+)?$/.test(
    value,
  );
}

function resolveVersionInput(argv) {
  const value = argv[2];

  if (!value) {
    throw new Error("Usage: pnpm release <patch|minor|major|x.y.z>");
  }

  if (validReleaseTypes.has(value) || isExplicitVersion(value)) {
    return value;
  }

  throw new Error(
    `Unsupported release target "${value}". Use patch, minor, major, or a semver version.`,
  );
}

function main() {
  const previousVersion = readCliPackageJson().version;
  const versionInput = resolveVersionInput(process.argv);

  run("npm", ["version", versionInput, "--no-git-tag-version"], cliRoot);

  const nextVersion = readCliPackageJson().version;

  if (previousVersion === nextVersion) {
    throw new Error(`Version did not change. Current version is still ${nextVersion}.`);
  }

  console.log(`Releasing taro-shadcn ${previousVersion} -> ${nextVersion}`);

  run("npm", ["publish", "--access", "public", "--provenance"], cliRoot);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
