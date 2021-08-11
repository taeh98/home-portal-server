module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        "prettier",
        "eslint-comments",
        "import"
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript',
        "airbnb",
        "prettier",
        "plugin:prettier/recommended",
        "plugin:eslint-comments/recommended",
        "plugin:import/errors",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript"
    ],
    env: {
        node: true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2020,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "rules": {
        "@typescript-eslint/no-explicit-any": ["error", { "ignoreRestArgs": false, "fixToUnknown": false }],
        "import/no-unresolved": 0,
        "prettier/prettier": [
            "error",
            {
                "printWidth": 80,
                "tabWidth": 4,
                "useTabs": true,
                "semi": true,
                "singleQuote": false,
                "quoteProps": "consistent",
                "jsxSingleQuote": false,
                "trailingComma": "all",
                "bracketSpacing": true,
                "jsxBracketSameLine": true,
                "arrowParens": "always",
                "requirePragma": false,
                "insertPragma": false,
                "proseWrap": "preserve",
                "htmlWhitespaceSensitivity": "css",
                "endOfLine": "lf",
                "embeddedLanguageFormatting": "auto"
            }
        ],
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "import/extensions": ["error", "never"],
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "no-undef": "off",
        "@typescript-eslint/explicit-function-return-type": ["error"],
        "@typescript-eslint/explicit-module-boundary-types": ["error"],
        "max-lines": ["error", 200],
        "max-lines-per-function": ["error", { "max": 20 }]
    },
    "ignorePatterns": [".eslintrc.js"]
};
