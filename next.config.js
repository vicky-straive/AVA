/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/, // Match JS, JSX, TS, and TSX files
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'], // Use Next.js' Babel preset without needing a separate file
        },
      },
      exclude: /node_modules/,
    });
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
      use: [{ loader: '@svgr/webpack' }],
    });
    return config;
  },
};

module.exports = nextConfig;
