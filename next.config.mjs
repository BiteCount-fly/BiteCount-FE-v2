/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // required for `next export`
  distDir: 'out',   // the output folder for static files
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
