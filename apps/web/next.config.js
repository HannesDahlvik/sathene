/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ['@sathene/api', '@sathene/db'],
    staticPageGenerationTimeout: 1000
}

module.exports = nextConfig
