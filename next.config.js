/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/saiik0z/sneaker-imgs/**',
      },
      {
        protocol: 'https',
        hostname: 'image.goat.com',
        pathname: '/transform/v1/attachments/product_template_pictures/images/**',
      },
    ],
  },
}

module.exports = nextConfig
