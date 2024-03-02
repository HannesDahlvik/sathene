/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ['@sathene/api', '@sathene/db'],
    staticPageGenerationTimeout: 10000,
    experimental: {
        serverComponentsExternalPackages: ['oslo']
    },
    webpack: (config) => {
        config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')
        return config
    }
}

module.exports = nextConfig
