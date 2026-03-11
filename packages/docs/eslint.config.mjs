import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends('taro/react'),
  {
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'jsx-quotes': ['error', 'prefer-double'],
      'react-hooks/exhaustive-deps': 'off',
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': 'off',
    },
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ignores: ['src/network.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "MemberExpression[object.name='process'][property.name='env']",
          message:
            '工程规范：请勿在 src 目录下直接使用 process.env\n如需获取 URL 请求前缀，请使用已经注入全局的 PROJECT_DOMAIN',
        },
        {
          selector:
            ":matches(ExportNamedDeclaration, ExportDefaultDeclaration) :matches([id.name='Network'], [declaration.id.name='Network'])",
          message:
            "工程规范：禁止自行定义 Network，项目已提供 src/network.ts，请直接使用: import { Network } from '@/network'",
        },
        {
          selector:
            'Literal[value=/(^|\\s)(?:[^\\s:]+:)*(bg|text|border|divide|outline|ring|ring-offset|from|to|via|decoration|shadow|accent|caret|fill|stroke)-[a-z0-9-]+\\/([0-9]+|\\[[^\\]]+\\])/], TemplateElement[value.raw=/(^|\\s)(?:[^\\s:]+:)*(bg|text|border|divide|outline|ring|ring-offset|from|to|via|decoration|shadow|accent|caret|fill|stroke)-[a-z0-9-]+\\/([0-9]+|\\[[^\\]]+\\])/]',
          message:
            '微信小程序兼容性：禁用 Tailwind 颜色不透明度简写（如 bg-primary/10），该语法在微信小程序下 opacity 会丢失。请拆分写（如 bg-primary bg-opacity-10）。',
        },
        {
          selector:
            'Literal[value=/(^|\\s)peer-[a-z0-9-]+\\b/], TemplateElement[value.raw=/(^|\\s)peer-[a-z0-9-]+\\b/]',
          message:
            '微信小程序兼容性：不支持 Tailwind 的 peer-*（如 peer-checked、peer-disabled）。',
        },
        {
          selector:
            'Literal[value=/(^|\\s)group-[a-z0-9-]+\\b/], TemplateElement[value.raw=/(^|\\s)group-[a-z0-9-]+\\b/]',
          message:
            '微信小程序兼容性：不支持 Tailwind 的 group-*（如 group-hover）。',
        },
        {
          selector:
            'Literal[value=/\\b(?!gap(?:-x|-y)?-)[a-zA-Z0-9-]+\\-[0-9]+\\.[0-9]+\\b/], TemplateElement[value.raw=/\\b(?!gap(?:-x|-y)?-)[a-zA-Z0-9-]+\\-[0-9]+\\.[0-9]+\\b/]',
          message:
            '微信小程序兼容性：禁用 Tailwind 小数值类名（如 space-y-1.5、w-0.5），请用整数替代（如 space-y-2、w-1）。',
        },
        {
          selector:
            ":matches(JSXAttribute[name.name='className'], CallExpression[callee.name=/^(cn|cva)$/]) :matches(Literal[value=/\\:has\\(/], TemplateElement[value.raw=/\\:has\\(/])",
          message:
            '微信小程序兼容性：WXSS 不支持 :has(...)（会导致预览上传失败）。',
        },
        {
          selector:
            ":matches(JSXAttribute[name.name='className'], CallExpression[callee.name=/^(cn|cva)$/]) :matches(Literal[value=/(^|\\s)has-[^\\s]+/], TemplateElement[value.raw=/(^|\\s)has-[^\\s]+/])",
          message:
            '微信小程序兼容性：禁用 Tailwind 的 has-* 变体（会生成 :has，导致预览上传失败）。',
        },
        {
          selector:
            ":matches(JSXAttribute[name.name='className'], CallExpression[callee.name=/^(cn|cva)$/]) :matches(Literal[value=/\\[&>\\*/], TemplateElement[value.raw=/\\[&>\\*/])",
          message:
            '微信小程序兼容性：禁用 [&>*...]（可能生成非法 WXSS，如 >:last-child）。请改为 [&>view] 等明确标签。',
        },
        {
          selector:
            ":matches(JSXAttribute[name.name='className'], CallExpression[callee.name=/^(cn|cva)$/]) :matches(Literal[value=/\\[&[^\\]]*\\[data-/], TemplateElement[value.raw=/\\[&[^\\]]*\\[data-/])",
          message:
            '微信小程序兼容性：禁用 Tailwind 任意选择器里的属性选择器（如 [&>[data-...]]），可能导致预览上传失败。',
        },
        {
          selector:
            ":matches(JSXAttribute[name.name='className'], CallExpression[callee.name=/^(cn|cva)$/]) :matches(Literal[value=/\\[[^\\]]*&[^\\]]*~[^\\]]*\\]/], TemplateElement[value.raw=/\\[[^\\]]*&[^\\]]*~[^\\]]*\\]/])",
          message: '微信小程序兼容性：WXSS 不支持 ~（会导致预览上传失败）。',
        },
      ],
      'no-restricted-properties': [
        'error',
        {
          object: 'Taro',
          property: 'request',
          message:
            "工程规范：请使用 Network.request 替代 Taro.request，导入方式: import { Network } from '@/network'",
        },
        {
          object: 'Taro',
          property: 'uploadFile',
          message:
            "工程规范：请使用 Network.uploadFile 替代 Taro.uploadFile，导入方式: import { Network } from '@/network'",
        },
        {
          object: 'Taro',
          property: 'downloadFile',
          message:
            "工程规范：请使用 Network.downloadFile 替代 Taro.downloadFile，导入方式: import { Network } from '@/network'",
        },
      ],
    },
  },
  {
    files: ['src/pages/index/index.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'JSXText[value=/应用开发中/]',
          message:
            '工程规范：检测到首页 (src/pages/index/index) 仍为默认占位页面，这会导致用户无法进入新增页面，请根据用户需求开发实际的首页功能和界面。如果已经开发了新的首页，也需要删除旧首页，并更新 src/app.config.ts 文件',
        },
      ],
    },
  },
  {
    ignores: ['dist/**', 'dist-*/**', 'node_modules/**'],
  },
];
