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
            '请勿在 src 目录下直接使用 process.env\n如需获取 URL 请求前缀，请使用已经注入全局的 PROJECT_DOMAIN',
        },
        {
          selector:
            ":matches(ExportNamedDeclaration, ExportDefaultDeclaration) :matches([id.name='Network'], [declaration.id.name='Network'])",
          message:
            "禁止自行定义 Network，项目已提供 src/network.ts，请直接使用: import { Network } from '@/network'",
        },
      ],
      'no-restricted-properties': [
        'error',
        {
          object: 'Taro',
          property: 'request',
          message:
            "请使用 Network.request 替代 Taro.request，导入方式: import { Network } from '@/network'",
        },
        {
          object: 'Taro',
          property: 'uploadFile',
          message:
            "请使用 Network.uploadFile 替代 Taro.uploadFile，导入方式: import { Network } from '@/network'",
        },
        {
          object: 'Taro',
          property: 'downloadFile',
          message:
            "请使用 Network.downloadFile 替代 Taro.downloadFile，导入方式: import { Network } from '@/network'",
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
            '检测到首页 (src/pages/index/index) 仍为默认占位页面，这会导致用户无法进入新增页面，请根据用户需求开发实际的首页功能和界面。如果已经开发了新的首页，也需要删除旧首页，并更新 src/app.config.ts 文件',
        },
      ],
    },
  },
  {
    ignores: ['dist/**', 'dist-*/**', 'node_modules/**'],
  },
];
