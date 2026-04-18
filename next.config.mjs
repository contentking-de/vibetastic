/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
      ignored: ['**/node_modules/**', '**/.next/**', '**/.git/**'],
    }
    return config
  },
}

export default nextConfig
