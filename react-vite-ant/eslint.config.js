import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
    js.configs.recommended,
    {
        ignores: ['dist'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parser: tsParser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            quotes: ['error', 'double'],
            'no-console': ['warn'],
            'react/react-in-tsx-scope': 'off',
            'no-unused-vars': 'error',
            'no-undef': 'error',
        },
    },
    prettier,
];
