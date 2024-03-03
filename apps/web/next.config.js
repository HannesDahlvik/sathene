/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ['@sathene/api', '@sathene/db'],
    staticPageGenerationTimeout: 180,
    experimental: {
        serverComponentsExternalPackages: ['oslo']
    },
    webpack: (config) => {
        config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')
        return config
    }
}

module.exports = nextConfig
