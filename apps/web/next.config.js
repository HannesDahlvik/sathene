/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ['@sathene/api', '@sathene/db']
}

module.exports = nextConfig
