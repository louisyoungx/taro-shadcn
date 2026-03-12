import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import prompts from 'prompts'
import { execSync } from 'child_process'

type ComponentsConfig = {
    style: string
    tailwind: {
        config: string
        css: string
        baseColor: string
        cssVariables: boolean
    }
    aliases: {
        components: string
        utils: string
    }
}

const program = new Command()

const DEFAULT_COMPONENTS_JSON: ComponentsConfig = {
    style: 'default',
    tailwind: {
        config: 'tailwind.config.ts',
        css: 'src/app.css',
        baseColor: 'zinc',
        cssVariables: true,
    },
    aliases: {
        components: 'src/components',
        utils: 'src/lib/utils',
    },
}

const BASE_DEPENDENCIES = [
    'clsx',
    'tailwind-merge',
    'class-variance-authority',
    'lucide-react-taro',
]

const COMPONENT_DEPENDENCIES: Record<string, string[]> = {
    calendar: ['date-fns'],
}

const COMPONENT_NAME_MAP: Record<string, string> = {
    Accordion: 'accordion',
    Alert: 'alert',
    AlertDialog: 'alert-dialog',
    AspectRatio: 'aspect-ratio',
    Avatar: 'avatar',
    Badge: 'badge',
    Breadcrumb: 'breadcrumb',
    Button: 'button',
    ButtonGroup: 'button-group',
    Calendar: 'calendar',
    Card: 'card',
    Carousel: 'carousel',
    Checkbox: 'checkbox',
    Collapsible: 'collapsible',
    Command: 'command',
    ContextMenu: 'context-menu',
    Dialog: 'dialog',
    Drawer: 'drawer',
    DropdownMenu: 'dropdown-menu',
    Field: 'field',
    HoverCard: 'hover-card',
    Input: 'input',
    InputGroup: 'input-group',
    InputOTP: 'input-otp',
    Label: 'label',
    Menubar: 'menubar',
    NavigationMenu: 'navigation-menu',
    Pagination: 'pagination',
    Popover: 'popover',
    Portal: 'portal',
    Progress: 'progress',
    RadioGroup: 'radio-group',
    Resizable: 'resizable',
    ScrollArea: 'scroll-area',
    Select: 'select',
    Separator: 'separator',
    Sheet: 'sheet',
    Skeleton: 'skeleton',
    Slider: 'slider',
    Sonner: 'sonner',
    Switch: 'switch',
    Table: 'table',
    Tabs: 'tabs',
    Textarea: 'textarea',
    Toast: 'toast',
    Toggle: 'toggle',
    ToggleGroup: 'toggle-group',
    Tooltip: 'tooltip',
    accordion: 'accordion',
    alert: 'alert',
    'alert-dialog': 'alert-dialog',
    'aspect-ratio': 'aspect-ratio',
    avatar: 'avatar',
    badge: 'badge',
    breadcrumb: 'breadcrumb',
    button: 'button',
    'button-group': 'button-group',
    calendar: 'calendar',
    card: 'card',
    carousel: 'carousel',
    checkbox: 'checkbox',
    collapsible: 'collapsible',
    command: 'command',
    'context-menu': 'context-menu',
    dialog: 'dialog',
    drawer: 'drawer',
    'dropdown-menu': 'dropdown-menu',
    field: 'field',
    'hover-card': 'hover-card',
    input: 'input',
    'input-group': 'input-group',
    'input-otp': 'input-otp',
    label: 'label',
    menubar: 'menubar',
    'navigation-menu': 'navigation-menu',
    pagination: 'pagination',
    popover: 'popover',
    portal: 'portal',
    progress: 'progress',
    'radio-group': 'radio-group',
    resizable: 'resizable',
    'scroll-area': 'scroll-area',
    select: 'select',
    separator: 'separator',
    sheet: 'sheet',
    skeleton: 'skeleton',
    slider: 'slider',
    sonner: 'sonner',
    switch: 'switch',
    table: 'table',
    tabs: 'tabs',
    textarea: 'textarea',
    toast: 'toast',
    toggle: 'toggle',
    'toggle-group': 'toggle-group',
    tooltip: 'tooltip',
}

function resolveComponentName(input: string) {
    const s = (input || '').trim().replace(/\.(tsx|ts|jsx|js)$/i, '')
    if (!s) return ''
    return COMPONENT_NAME_MAP[s] || ''
}

function resolveRegistryPath() {
    const candidates = [
        path.join(__dirname, 'registry', 'ui'),
        path.join(__dirname, '../docs/src/components/ui'),
    ]
    for (const p of candidates) {
        if (fs.existsSync(p)) return p
    }
    return null
}

function resolveUtilsTemplatePath() {
    const candidates = [
        path.join(__dirname, 'templates', 'utils.ts'),
        path.join(__dirname, '../docs/src/lib/utils.ts'),
    ]
    for (const p of candidates) {
        if (fs.existsSync(p)) return p
    }
    return null
}

function parseImportSources(code: string) {
    const sources: string[] = []
    const importFromRe = /\bfrom\s+["']([^"']+)["']/g
    const importSideEffectRe = /\bimport\s+["']([^"']+)["']/g
    const requireRe = /\brequire\(\s*["']([^"']+)["']\s*\)/g
    for (const re of [importFromRe, importSideEffectRe, requireRe]) {
        let match: RegExpExecArray | null
        while ((match = re.exec(code)) !== null) {
            sources.push(match[1])
        }
    }
    return sources
}

function getPackageName(specifier: string) {
    if (!specifier) return null
    if (specifier.startsWith('@')) {
        const parts = specifier.split('/')
        if (parts.length >= 2) return `${parts[0]}/${parts[1]}`
        return specifier
    }
    return specifier.split('/')[0]
}

function getPackageManager() {
    const cwd = process.cwd()
    if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
    if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn'
    return 'npm'
}

function installDependencies(deps: string[]) {
    const cwd = process.cwd()
    const pkgPath = path.join(cwd, 'package.json')
    let missingDeps = deps

    if (fs.existsSync(pkgPath)) {
        try {
            const pkg = fs.readJSONSync(pkgPath) as {
                dependencies?: Record<string, string>
                devDependencies?: Record<string, string>
            }
            const allDeps = {
                ...(pkg.dependencies || {}),
                ...(pkg.devDependencies || {}),
            }
            missingDeps = deps.filter(d => !allDeps[d])
        } catch {
            // ignore
        }
    }

    if (missingDeps.length === 0) return

    const pm = getPackageManager()
    const command =
        pm === 'npm'
            ? `npm install ${missingDeps.join(' ')}`
            : `${pm} add ${missingDeps.join(' ')}`
    console.log(
        chalk.blue(`Installing dependencies: ${missingDeps.join(', ')}...`),
    )
    try {
        execSync(command, { stdio: 'inherit', cwd })
    } catch {
        console.log(
            chalk.red(`Failed to install dependencies. Please run: ${command}`),
        )
    }
}

function getCliVersion() {
    try {
        const pkg = fs.readJSONSync(path.join(__dirname, 'package.json')) as {
            version?: string
        }
        if (pkg.version) return pkg.version
    } catch {
        // ignore
    }
    try {
        const pkg = fs.readJSONSync(
            path.join(__dirname, '..', 'package.json'),
        ) as { version?: string }
        if (pkg.version) return pkg.version
    } catch {
        // ignore
    }
    return '0.0.0'
}

async function initializeProject(options: { yes?: boolean }) {
    const cwd = process.cwd()
    const pkgPath = path.join(cwd, 'package.json')

    if (!fs.existsSync(pkgPath)) {
        console.log(
            chalk.red(
                'Error: No package.json found. Please run this in a Taro project.',
            ),
        )
        return null
    }

    try {
        const pkg = fs.readJSONSync(pkgPath) as {
            dependencies?: Record<string, string>
        }
        if (!pkg.dependencies?.['@tarojs/taro']) {
            console.log(
                chalk.yellow(
                    'Warning: This project does not seem to be a Taro project.',
                ),
            )
        }
    } catch {
        // ignore
    }

    let response: { componentsPath: string; utilsPath: string } = {
        componentsPath: DEFAULT_COMPONENTS_JSON.aliases.components,
        utilsPath: DEFAULT_COMPONENTS_JSON.aliases.utils,
    }

    if (!options.yes) {
        const res = (await prompts([
            {
                type: 'text',
                name: 'componentsPath',
                message: 'Where is your components directory?',
                initial: DEFAULT_COMPONENTS_JSON.aliases.components,
            },
            {
                type: 'text',
                name: 'utilsPath',
                message: 'Where is your utils directory?',
                initial: DEFAULT_COMPONENTS_JSON.aliases.utils,
            },
        ])) as { componentsPath?: string; utilsPath?: string }
        response = {
            componentsPath:
                res.componentsPath ||
                DEFAULT_COMPONENTS_JSON.aliases.components,
            utilsPath: res.utilsPath || DEFAULT_COMPONENTS_JSON.aliases.utils,
        }
    }

    const config: ComponentsConfig = {
        ...DEFAULT_COMPONENTS_JSON,
        aliases: {
            components: response.componentsPath,
            utils: response.utilsPath,
        },
    }

    await fs.writeJSON(path.join(process.cwd(), 'components.json'), config, {
        spaces: 2,
    })
    console.log(chalk.green('✔ Created components.json.'))

    const utilsDir = path.join(process.cwd(), response.utilsPath)
    await fs.ensureDir(utilsDir)
    const utilsTarget = path.join(utilsDir, 'index.ts')

    if (!fs.existsSync(utilsTarget)) {
        const utilsTemplatePath = resolveUtilsTemplatePath()
        if (!utilsTemplatePath) {
            console.log(chalk.red('Error: utils template not found.'))
            return null
        }
        await fs.copy(utilsTemplatePath, utilsTarget)
        console.log(chalk.green(`✔ Created ${utilsTarget}.`))
    }

    let install = !!options.yes
    if (!options.yes) {
        const res = (await prompts({
            type: 'confirm',
            name: 'install',
            message: 'Do you want to install base dependencies?',
            initial: true,
        })) as { install?: boolean }
        install = !!res.install
    }

    if (install) {
        installDependencies(BASE_DEPENDENCIES)
    }

    console.log(chalk.green('\n✔ Project initialized successfully!'))
    return config
}

program
    .name('taro-shadcn')
    .description('Taro Shadcn UI CLI')
    .version(getCliVersion())

program
    .command('init')
    .description('Initialize your project and install dependencies')
    .option('-y, --yes', 'Skip confirmation prompt.', false)
    .action(async (options: { yes?: boolean }) => {
        await initializeProject(options)
    })

program
    .command('add')
    .description('Add a component to your project')
    .argument('[components...]', 'The components to add.')
    .option('-y, --yes', 'Skip confirmation prompt.', false)
    .option('-o, --overwrite', 'Overwrite existing files.', false)
    .action(
        async (
            components: string[],
            options: { yes?: boolean; overwrite?: boolean },
        ) => {
            if (!components || components.length === 0) {
                console.log(chalk.red('Error: No components specified.'))
                return
            }

            const configPath = path.join(process.cwd(), 'components.json')
            let config: ComponentsConfig | null = null
            if (!fs.existsSync(configPath)) {
                let shouldInit = !!options.yes
                if (!options.yes) {
                    const res = (await prompts({
                        type: 'confirm',
                        name: 'init',
                        message:
                            'components.json not found. Initialize now and continue?',
                        initial: true,
                    })) as { init?: boolean }
                    shouldInit = !!res.init
                }

                if (!shouldInit) return
                config = await initializeProject({ yes: options.yes })
                if (!config) return
            } else {
                config = (await fs.readJSON(configPath)) as ComponentsConfig
            }

            const utilsDir = path.join(process.cwd(), config.aliases.utils)
            const utilsFile = path.join(utilsDir, 'index.ts')
            if (!fs.existsSync(utilsFile)) {
                await fs.ensureDir(utilsDir)
                const utilsTemplatePath = resolveUtilsTemplatePath()
                if (!utilsTemplatePath) {
                    console.log(chalk.red('Error: utils template not found.'))
                    return
                }
                await fs.copy(utilsTemplatePath, utilsFile)
                console.log(chalk.green(`✔ Created ${utilsFile}.`))
            }

            const componentsDir = path.join(
                process.cwd(),
                config.aliases.components,
                'ui',
            )
            await fs.ensureDir(componentsDir)

            const registryPath = resolveRegistryPath()
            if (!registryPath) {
                console.log(chalk.red('Error: Component registry not found.'))
                return
            }

            const externalDeps = new Set<string>()
            const seenComponents = new Set<string>()

            const ignoredExternalPackages = new Set<string>([
                'react',
                'react-dom',
                '@tarojs/components',
                '@tarojs/taro',
                ...BASE_DEPENDENCIES,
            ])

            const copyComponent = async (componentName: string) => {
                const normalizedName = resolveComponentName(componentName)
                if (!normalizedName) return
                if (seenComponents.has(normalizedName)) return
                seenComponents.add(normalizedName)

                const sourceFile = path.join(
                    registryPath,
                    `${normalizedName}.tsx`,
                )
                const targetFile = path.join(
                    componentsDir,
                    `${normalizedName}.tsx`,
                )

                if (!fs.existsSync(sourceFile)) {
                    console.log(
                        chalk.red(
                            `Error: Component "${componentName}" not found.`,
                        ),
                    )
                    return
                }

                if (
                    fs.existsSync(targetFile) &&
                    !options.overwrite &&
                    !options.yes
                ) {
                    const res = (await prompts({
                        type: 'confirm',
                        name: 'overwrite',
                        message: `Component "${componentName}" already exists. Overwrite?`,
                        initial: false,
                    })) as { overwrite?: boolean }

                    if (!res.overwrite) {
                        console.log(
                            chalk.yellow(`Skipping "${componentName}".`),
                        )
                        return
                    }
                }

                await fs.copy(sourceFile, targetFile)
                console.log(chalk.green(`✔ Added "${componentName}".`))

                const code = await fs.readFile(sourceFile, 'utf8')
                const sources = parseImportSources(code)

                for (const src of sources) {
                    if (src.startsWith('@/components/ui/')) {
                        const dep = src
                            .slice('@/components/ui/'.length)
                            .split('/')[0]
                        const depName = dep.replace(/\.(tsx|ts|jsx|js)$/, '')
                        if (depName) await copyComponent(depName)
                        continue
                    }

                    if (src.startsWith('./') || src.startsWith('../')) {
                        const resolvedBase = path.resolve(
                            path.dirname(sourceFile),
                            src,
                        )
                        const candidates = [
                            resolvedBase,
                            `${resolvedBase}.tsx`,
                            `${resolvedBase}.ts`,
                        ]
                        const found = candidates.find(p => fs.existsSync(p))
                        if (found && path.dirname(found) === registryPath) {
                            const depName = path
                                .basename(found)
                                .replace(/\.(tsx|ts)$/, '')
                            if (depName) await copyComponent(depName)
                        }
                        continue
                    }

                    if (src.startsWith('@/')) continue
                    const pkg = getPackageName(src)
                    if (!pkg) continue
                    if (ignoredExternalPackages.has(pkg)) continue
                    externalDeps.add(pkg)
                }

                const deps = COMPONENT_DEPENDENCIES[normalizedName]
                if (deps) deps.forEach(d => externalDeps.add(d))
            }

            for (const component of components) {
                await copyComponent(component)
            }

            if (externalDeps.size > 0) {
                const depsArray = Array.from(externalDeps)
                if (options.yes) {
                    installDependencies(depsArray)
                } else {
                    const res = (await prompts({
                        type: 'confirm',
                        name: 'install',
                        message: `Install following dependencies: ${depsArray.join(', ')}?`,
                        initial: true,
                    })) as { install?: boolean }
                    if (res.install) {
                        installDependencies(depsArray)
                    }
                }
            }
        },
    )

program.parse()
