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
    const utilsTemplate = path.join(__dirname, "templates", "utils.ts");
    const utilsTarget = path.join(utilsDir, "index.ts"); // Usually index.ts or utils.ts

    if (!fs.existsSync(utilsTarget)) {
      await fs.copy(utilsTemplate, utilsTarget);
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
      const utilsTemplate = path.join(__dirname, "templates", "utils.ts");
      await fs.copy(utilsTemplate, utilsFile);
      console.log(chalk.green(`✔ Created ${utilsFile}.`));
    }

    const componentsDir = path.join(
      process.cwd(),
      config.aliases.components,
      "ui"
    );

    await fs.ensureDir(componentsDir);

    const registryPath = path.join(__dirname, "../components/ui");
    const allDeps = new Set();

    for (const component of components) {
      const sourceFile = path.join(registryPath, `${component}.tsx`);
      const targetFile = path.join(componentsDir, `${component}.tsx`);

      if (!fs.existsSync(sourceFile)) {
        console.log(chalk.red(`Error: Component "${component}" not found.`));
        continue;
      }

      if (fs.existsSync(targetFile) && !options.overwrite && !options.yes) {
        const { overwrite } = await prompts({
          type: "confirm",
          name: "overwrite",
          message: `Component "${component}" already exists. Overwrite?`,
          initial: false,
        });

        if (!overwrite) {
          console.log(chalk.yellow(`Skipping "${component}".`));
          continue;
        }
      }

      await fs.copy(sourceFile, targetFile);
      console.log(chalk.green(`✔ Added "${component}".`));

      // Add dependencies
      const deps = COMPONENT_DEPENDENCIES[component];
      if (deps) {
        deps.forEach(d => allDeps.add(d));
      }
    }

    if (allDeps.size > 0) {
      const depsArray = Array.from(allDeps);
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
