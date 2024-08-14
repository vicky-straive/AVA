// next.config.js
module.exports = {
  // Other configurations...
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  // Ensure the output directory is correctly set
  distDir: 'build',
};