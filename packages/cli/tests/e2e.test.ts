import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { execSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'

const PKG_ROOT = process.cwd()
const TEST_DIR = path.join(PKG_ROOT, 'tests', 'test-project')
const TEST_DIR_AUTO = path.join(PKG_ROOT, 'tests', 'test-project-auto-init')
const CLI_PATH = path.join(PKG_ROOT, 'dist', 'index.js')

function runCliIn(cwd: string, args: string) {
    return execSync(`node ${CLI_PATH} ${args}`, { cwd }).toString()
}

function runCli(args: string) {
    return runCliIn(TEST_DIR, args)
}

describe('CLI E2E Tests', () => {
    beforeAll(async () => {
        await fs.ensureDir(TEST_DIR)
        await fs.ensureDir(TEST_DIR_AUTO)
        await fs.writeJSON(
            path.join(TEST_DIR, 'package.json'),
            {
                name: 'test-project',
                version: '1.0.0',
                dependencies: {},
            },
            { spaces: 2 },
        )
        await fs.writeJSON(
            path.join(TEST_DIR_AUTO, 'package.json'),
            {
                name: 'test-project-auto-init',
                version: '1.0.0',
                dependencies: {},
            },
            { spaces: 2 },
        )
    })

    afterAll(async () => {
        await fs.remove(TEST_DIR)
        await fs.remove(TEST_DIR_AUTO)
    })

    it("should initialize the project using 'init --yes'", async () => {
        const output = runCli('init --yes')
        expect(output).toContain('Project initialized successfully')

        expect(fs.existsSync(path.join(TEST_DIR, 'components.json'))).toBe(true)
        expect(
            fs.existsSync(path.join(TEST_DIR, 'src/lib/utils/index.ts')),
        ).toBe(true)

        const pkg = (await fs.readJSON(
            path.join(TEST_DIR, 'package.json'),
        )) as {
            dependencies?: Record<string, string>
        }
        expect(pkg.dependencies).toHaveProperty('clsx')
    }, 60000)

    it('should auto init when adding components without components.json', async () => {
        const output = runCliIn(TEST_DIR_AUTO, 'add button -y')
        expect(output).toContain('Created components.json')
        expect(output).toContain('Project initialized successfully')
        expect(output).toContain('Added "button"')

        expect(fs.existsSync(path.join(TEST_DIR_AUTO, 'components.json'))).toBe(
            true,
        )
        expect(
            fs.existsSync(
                path.join(TEST_DIR_AUTO, 'src/components/ui/button.tsx'),
            ),
        ).toBe(true)
        expect(
            fs.existsSync(path.join(TEST_DIR_AUTO, 'src/lib/utils/index.ts')),
        ).toBe(true)
    }, 60000)

    it('should add a component and ensure utils exists', async () => {
        await fs.remove(path.join(TEST_DIR, 'src/lib/utils/index.ts'))

        const output = runCli('add button -y')
        expect(output).toContain('Created')
        expect(output).toContain('Added "button"')

        expect(
            fs.existsSync(path.join(TEST_DIR, 'src/components/ui/button.tsx')),
        ).toBe(true)
        expect(
            fs.existsSync(path.join(TEST_DIR, 'src/lib/utils/index.ts')),
        ).toBe(true)

        const utilsContents = await fs.readFile(
            path.join(TEST_DIR, 'src/lib/utils/index.ts'),
            'utf8',
        )
        expect(utilsContents).toContain('export function cn')

        const buttonContents = await fs.readFile(
            path.join(TEST_DIR, 'src/components/ui/button.tsx'),
            'utf8',
        )
        expect(buttonContents).toMatch(/from\s+["']@\/lib\/utils["']/)
    }, 60000)

    it('should accept PascalCase component names', async () => {
        await fs.remove(path.join(TEST_DIR, 'src/components/ui'))

        const output = runCli('add Button InputGroup -y')
        expect(output).toContain('Added "Button"')
        expect(output).toContain('Added "InputGroup"')

        expect(
            fs.existsSync(path.join(TEST_DIR, 'src/components/ui/button.tsx')),
        ).toBe(true)
        expect(
            fs.existsSync(
                path.join(TEST_DIR, 'src/components/ui/input-group.tsx'),
            ),
        ).toBe(true)
    }, 60000)

    it('should add a component with specific dependencies', async () => {
        const output = runCli('add calendar -y')
        expect(output).toContain('Added "calendar"')

        const calendarPath = path.join(
            TEST_DIR,
            'src/components/ui/calendar.tsx',
        )
        expect(fs.existsSync(calendarPath)).toBe(true)

        const pkg = (await fs.readJSON(
            path.join(TEST_DIR, 'package.json'),
        )) as {
            dependencies?: Record<string, string>
        }
        expect(pkg.dependencies).toHaveProperty('date-fns')
    }, 60000)

    it('should add dependent ui components when a component imports them', async () => {
        await fs.remove(path.join(TEST_DIR, 'src/components/ui'))

        const output = runCli('add calendar -y')
        expect(output).toContain('Added "calendar"')

        expect(
            fs.existsSync(
                path.join(TEST_DIR, 'src/components/ui/calendar.tsx'),
            ),
        ).toBe(true)
        expect(
            fs.existsSync(path.join(TEST_DIR, 'src/components/ui/button.tsx')),
        ).toBe(true)
    }, 60000)
})
