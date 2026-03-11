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
  if (fs.existsSync("pnpm-lock.yaml")) return "pnpm";
  if (fs.existsSync("yarn.lock")) return "yarn";
  return "npm";
}

function installDependencies(deps) {
  const pm = getPackageManager();
  const command = pm === "npm" ? `npm install ${deps.join(" ")}` : `${pm} add ${deps.join(" ")}`;
  console.log(chalk.blue(`Installing dependencies: ${deps.join(", ")}...`));
  try {
    execSync(command, { stdio: "inherit" });
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
  .action(async () => {
    const response = await prompts([
      {
        type: "text",
        name: "componentsPath",
        message: "Where is your components directory?",
        initial: "src/components",
      },
      {
        type: "text",
        name: "utilsPath",
        message: "Where is your utils directory?",
        initial: "src/lib/utils",
      },
    ]);

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
    const { install } = await prompts({
      type: "confirm",
      name: "install",
      message: "Do you want to install base dependencies?",
      initial: true,
    });

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
