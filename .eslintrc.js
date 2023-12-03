/** @type {import("eslint").Linter.Config} */
module.exports = {
    ignorePatterns: ['apps/**', 'packages/**'],
    extends: ['@sathene/eslint/library.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true
    }
}
