/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: "standalone",
  ...(isProd && {
    basePath: '/tunequest',
    assetPrefix: '/tunequest',
  }),
};

export default nextConfig;