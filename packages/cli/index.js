#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const prompts = require("prompts");
const { execSync } = require("child_process");

const program = new Command();

const DEFAULT_COMPONENTS_JSON = {
  style: "default",
  tailwind: {
    config: "tailwind.config.ts",
    css: "src/app.css",
    baseColor: "zinc",
    cssVariables: true,
  },
  aliases: {
    components: "src/components",
    utils: "src/lib/utils",
  },
};

const BASE_DEPENDENCIES = ["clsx", "tailwind-merge", "class-variance-authority", "lucide-react-taro"];

const COMPONENT_DEPENDENCIES = {
  "calendar": ["date-fns"],
  "form": ["react-hook-form", "@hookform/resolvers", "zod"],
};

function resolveRegistryPath() {
  const candidates = [
    path.join(__dirname, "registry", "ui"),
    path.join(__dirname, "../docs/src/components/ui"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function resolveUtilsTemplatePath() {
  const candidates = [
    path.join(__dirname, "../docs/src/lib/utils.ts"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function parseImportSources(code) {
  const sources = [];
  const importFromRe = /\bfrom\s+["']([^"']+)["']/g;
  const importSideEffectRe = /\bimport\s+["']([^"']+)["']/g;
  const requireRe = /\brequire\(\s*["']([^"']+)["']\s*\)/g;
  for (const re of [importFromRe, importSideEffectRe, requireRe]) {
    let match;
    while ((match = re.exec(code)) !== null) {
      sources.push(match[1]);
    }
  }
  return sources;
}

function getPackageName(specifier) {
  if (!specifier) return null;
  if (specifier.startsWith("@")) {
    const parts = specifier.split("/");
    if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
    return specifier;
  }
  return specifier.split("/")[0];
}

function getPackageManager() {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

function installDependencies(deps) {
  const cwd = process.cwd();
  const pkgPath = path.join(cwd, "package.json");
  let missingDeps = deps;

  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = fs.readJSONSync(pkgPath);
      const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
      missingDeps = deps.filter(d => !allDeps[d]);
    } catch (e) {
      // Ignore read errors
    }
  }

  if (missingDeps.length === 0) return;

  const pm = getPackageManager();
  const command = pm === "npm" ? `npm install ${missingDeps.join(" ")}` : `${pm} add ${missingDeps.join(" ")}`;
  console.log(chalk.blue(`Installing dependencies: ${missingDeps.join(", ")}...`));
  try {
    execSync(command, { stdio: "inherit", cwd });
  } catch (error) {
    console.log(chalk.red(`Failed to install dependencies. Please run: ${command}`));
  }
}

program
  .name("taro-shadcn")
  .description("Taro Shadcn UI CLI")
  .version("0.0.1");

program
  .command("init")
  .description("Initialize your project and install dependencies")
  .option("-y, --yes", "Skip confirmation prompt.", false)
  .action(async (options) => {
    const cwd = process.cwd();
    const pkgPath = path.join(cwd, "package.json");

    if (!fs.existsSync(pkgPath)) {
      console.log(chalk.red("Error: No package.json found. Please run this in a Taro project."));
      return;
    }

    try {
      const pkg = fs.readJSONSync(pkgPath);
      if (!pkg.dependencies?.["@tarojs/taro"]) {
        console.log(chalk.yellow("Warning: This project does not seem to be a Taro project."));
      }
    } catch (e) {
      // Ignore read errors
    }

    let response = {
      componentsPath: DEFAULT_COMPONENTS_JSON.aliases.components,
      utilsPath: DEFAULT_COMPONENTS_JSON.aliases.utils,
    };

    if (!options.yes) {
      response = await prompts([
        {
          type: "text",
          name: "componentsPath",
          message: "Where is your components directory?",
          initial: DEFAULT_COMPONENTS_JSON.aliases.components,
        },
        {
          type: "text",
          name: "utilsPath",
          message: "Where is your utils directory?",
          initial: DEFAULT_COMPONENTS_JSON.aliases.utils,
        },
      ]);
    }

    const config = {
      ...DEFAULT_COMPONENTS_JSON,
      aliases: {
        components: response.componentsPath,
        utils: response.utilsPath,
      },
    };

    // 1. Create components.json
    await fs.writeJSON(path.join(process.cwd(), "components.json"), config, {
      spaces: 2,
    });
    console.log(chalk.green("✔ Created components.json."));

    // 2. Create utils.ts
    const utilsDir = path.join(process.cwd(), response.utilsPath);
    await fs.ensureDir(utilsDir);
    const utilsTarget = path.join(utilsDir, "index.ts"); // Usually index.ts or utils.ts

    if (!fs.existsSync(utilsTarget)) {
      const utilsTemplatePath = resolveUtilsTemplatePath();
      if (!utilsTemplatePath) {
        console.log(chalk.red("Error: utils template not found."));
        return;
      }
      await fs.copy(utilsTemplatePath, utilsTarget);
      console.log(chalk.green(`✔ Created ${utilsTarget}.`));
    }

    // 3. Install base dependencies
    let install = options.yes;
    if (!options.yes) {
      const res = await prompts({
        type: "confirm",
        name: "install",
        message: "Do you want to install base dependencies?",
        initial: true,
      });
      install = res.install;
    }

    if (install) {
      installDependencies(BASE_DEPENDENCIES);
    }

    console.log(chalk.green("\n✔ Project initialized successfully!"));
  });

program
  .command("add")
  .description("Add a component to your project")
  .argument("[components...]", "The components to add.")
  .option("-y, --yes", "Skip confirmation prompt.", false)
  .option("-o, --overwrite", "Overwrite existing files.", false)
  .action(async (components, options) => {
    if (!components || components.length === 0) {
      console.log(chalk.red("Error: No components specified."));
      return;
    }

    const configPath = path.join(process.cwd(), "components.json");
    if (!fs.existsSync(configPath)) {
      console.log(
        chalk.red("Error: components.json not found. Run 'init' first.")
      );
      return;
    }

    const config = await fs.readJSON(configPath);

    // Ensure utils.ts exists
    const utilsDir = path.join(process.cwd(), config.aliases.utils);
    const utilsFile = path.join(utilsDir, "index.ts");
    if (!fs.existsSync(utilsFile)) {
      await fs.ensureDir(utilsDir);
      const utilsTemplatePath = resolveUtilsTemplatePath();
      if (!utilsTemplatePath) {
        console.log(chalk.red("Error: utils template not found."));
        return;
      }
      await fs.copy(utilsTemplatePath, utilsFile);
      console.log(chalk.green(`✔ Created ${utilsFile}.`));
    }

    const componentsDir = path.join(
      process.cwd(),
      config.aliases.components,
      "ui"
    );

    await fs.ensureDir(componentsDir);

    const registryPath = resolveRegistryPath();
    if (!registryPath) {
      console.log(chalk.red("Error: Component registry not found."));
      return;
    }

    const externalDeps = new Set();
    const seenComponents = new Set();

    const ignoredExternalPackages = new Set([
      "react",
      "react-dom",
      "@tarojs/components",
      "@tarojs/taro",
      ...BASE_DEPENDENCIES,
    ]);

    async function copyComponent(componentName) {
      if (seenComponents.has(componentName)) return;
      seenComponents.add(componentName);

      const sourceFile = path.join(registryPath, `${componentName}.tsx`);
      const targetFile = path.join(componentsDir, `${componentName}.tsx`);

      if (!fs.existsSync(sourceFile)) {
        console.log(chalk.red(`Error: Component "${componentName}" not found.`));
        return;
      }

      if (fs.existsSync(targetFile) && !options.overwrite && !options.yes) {
        const { overwrite } = await prompts({
          type: "confirm",
          name: "overwrite",
          message: `Component "${componentName}" already exists. Overwrite?`,
          initial: false,
        });

        if (!overwrite) {
          console.log(chalk.yellow(`Skipping "${componentName}".`));
          return;
        }
      }

      await fs.copy(sourceFile, targetFile);
      console.log(chalk.green(`✔ Added "${componentName}".`));

      const code = await fs.readFile(sourceFile, "utf8");
      const sources = parseImportSources(code);

      for (const src of sources) {
        if (src.startsWith("@/components/ui/")) {
          const dep = src.slice("@/components/ui/".length).split("/")[0];
          const depName = dep.replace(/\.(tsx|ts|jsx|js)$/, "");
          if (depName) await copyComponent(depName);
          continue;
        }

        if (src.startsWith("./") || src.startsWith("../")) {
          const resolvedBase = path.resolve(path.dirname(sourceFile), src);
          const candidates = [
            resolvedBase,
            `${resolvedBase}.tsx`,
            `${resolvedBase}.ts`,
          ];
          const found = candidates.find((p) => fs.existsSync(p));
          if (found && path.dirname(found) === registryPath) {
            const depName = path.basename(found).replace(/\.(tsx|ts)$/, "");
            if (depName) await copyComponent(depName);
          }
          continue;
        }

        if (src.startsWith("@/")) continue;
        const pkg = getPackageName(src);
        if (!pkg) continue;
        if (ignoredExternalPackages.has(pkg)) continue;
        externalDeps.add(pkg);
      }

      const deps = COMPONENT_DEPENDENCIES[componentName];
      if (deps) deps.forEach((d) => externalDeps.add(d));
    }

    for (const component of components) {
      await copyComponent(component);
    }

    if (externalDeps.size > 0) {
      const depsArray = Array.from(externalDeps);
      if (options.yes) {
        installDependencies(depsArray);
      } else {
        const { install } = await prompts({
          type: "confirm",
          name: "install",
          message: `Install following dependencies: ${depsArray.join(", ")}?`,
          initial: true,
        });
        if (install) {
          installDependencies(depsArray);
        }
      }
    }
  });

program.parse();
