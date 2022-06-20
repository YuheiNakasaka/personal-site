import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"

const config: BlitzConfig = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "personal-site",
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  webpack: (config, { isServer }) => {
    config.experiments = {
      asyncWebAssembly: true,
    }
    config.output.webassemblyModuleFilename = (isServer ? "../" : "") + "static/wasm/sb2md.wasm"
    return config
  },
  env: {
    BASE_URL: "https://razokulover.com",
    TWITTER_ETH_CONTRACT_ID: `${process.env.TWITTER_ETH_CONTRACT_ID}`,
  },
}
module.exports = config
