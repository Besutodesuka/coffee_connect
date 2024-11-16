/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/, // Target .svg files
        issuer: /\.(js|ts)x?$/, // Process files imported in JS/TS
        use: ['@svgr/webpack'], // Use the SVGR loader
      });
      return config;
    },
  };

export default nextConfig;
