module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['tsconfig.eslint.json'],
        createDefaultProgram: true,
      },
      plugins: ['prettier', 'simple-import-sort'],
      extends: [
        'plugin:import/recommended',
        'plugin:import/typescript',
        'airbnb-typescript/base',
        'prettier',
        'plugin:prettier/recommended',
      ],
      rules: {
        'prettier/prettier': 'error',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.s?css$'],
            ],
          },
        ],
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'max-len': [
          'error',
          {
            code: 100,
            ignorePattern: '^import .*',
            ignoreComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
          },
        ],
        '@typescript-eslint/lines-between-class-members': [
          'error',
          'always',
          { exceptAfterSingleLine: true },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: true,
            },
          },
          {
            selector: 'typeAlias',
            format: ['PascalCase'],
            custom: {
              regex: '^T[A-Z]',
              match: true,
            },
          },
          {
            selector: 'enum',
            format: ['PascalCase'],
            custom: {
              regex: '^E[A-Z]',
              match: true,
            },
          },
        ],
      },
      reportUnusedDisableDirectives: true,
    },
    {
      files: ['*.interface.ts', '*.enum.ts', '*.model.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        extraFileExtensions: ['*.ts'],
        project: ['tsconfig.eslint.json'],
        createDefaultProgram: true,
      },
      plugins: ['prettier'],
      extends: ['plugin:typescript-sort-keys/recommended'],
    },
    {
      files: ['src/**/*.spec.ts', 'src/**/*.d.ts', 'src/**/*.mock.ts'],
      parserOptions: {
        project: ['tsconfig.eslint.json'],
        createDefaultProgram: true,
      },
      plugins: ['prettier', 'jasmine'],
      extends: ['plugin:jasmine/recommended'],
      env: { jasmine: true },
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'jasmine/no-disabled-tests': 'off',
      },
    },
  ],
};
