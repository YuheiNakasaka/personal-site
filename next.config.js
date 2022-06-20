/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    config.output.webassemblyModuleFilename =
      (isServer ? "../" : "") + "static/wasm/[modulehash].wasm";
    return config;
  },
  env: {
    BASE_URL: "https://razokulover.com",
    TWITTER_ETH_CONTRACT_ID: `${process.env.TWITTER_ETH_CONTRACT_ID}`,
  },
};

module.exports = nextConfig;
