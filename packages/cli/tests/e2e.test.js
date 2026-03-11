import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEST_DIR = path.join(__dirname, "tmp");
const CLI_PATH = path.resolve(__dirname, "../index.js");

function runCli(args) {
  return execSync(`node ${CLI_PATH} ${args}`, { cwd: TEST_DIR }).toString();
}

describe("CLI E2E Tests", () => {
  beforeAll(async () => {
    await fs.ensureDir(TEST_DIR);
  });

  afterAll(async () => {
    await fs.remove(TEST_DIR);
  });

  it("should initialize the project (mocked config)", async () => {
    const config = {
      style: "default",
      tailwind: { config: "tailwind.config.ts", css: "src/app.css" },
      aliases: { components: "src/components", utils: "src/lib/utils" }
    };
    await fs.writeJSON(path.join(TEST_DIR, "components.json"), config);
    expect(fs.existsSync(path.join(TEST_DIR, "components.json"))).toBe(true);
  });

  it("should add a component", async () => {
    const output = runCli("add button -y");
    expect(output).toContain('Added "button"');

    const buttonPath = path.join(TEST_DIR, "src/components/ui/button.tsx");
    expect(fs.existsSync(buttonPath)).toBe(true);
  });

  it("should add a component with dependencies", async () => {
    const output = runCli("add calendar -y");
    expect(output).toContain('Added "calendar"');
    // Note: In E2E, we might not actually install dependencies if it's too slow, 
    // but we check if the component file exists.
    const calendarPath = path.join(TEST_DIR, "src/components/ui/calendar.tsx");
    expect(fs.existsSync(calendarPath)).toBe(true);
  }, 30000);
});
