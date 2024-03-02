/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ['@sathene/api', '@sathene/db'],
    staticPageGenerationTimeout: 180,
    experimental: {
        serverComponentsExternalPackages: ['oslo']
    }
}

module.exports = nextConfig
