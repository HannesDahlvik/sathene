/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ['@sathene/eslint/next.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true
    }
}
