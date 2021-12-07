import { ReactNode } from "react"
import { Head } from "blitz"
import { ChainId, DAppProvider, Config } from "@usedapp/core"

const config: Config = {
  readOnlyChainId: ChainId.Hardhat,
  readOnlyUrls: {
    [ChainId.Hardhat]: "http://localhost:8545",
  },
  multicallAddresses: {
    [ChainId.Hardhat]: "http://localhost:8545",
  },
}

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "personal-site"}</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@razokulover" />
        <meta property="og:url" content={`${process.env.BASE_URL}/playgrounds/twitter_eth`} />
        <meta property="og:title" content="razokulover" />
        <meta property="og:image" content={`${process.env.BASE_URL}/razokulover-icon.png`} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <style>
          {`
                body {
                  font-family: -apple-system,"BlinkMacSystemFont","Hiragino Kaku Gothic ProN","Hiragino Sans",Meiryo,sans-serif,"Segoe UI Emoji";
                  font-size: 1.05em;
                }
                ul {
                  margin: 0 !important;
                  padding: 0;
                  list-style-type: none !important;
                }
          `}
        </style>
      </Head>

      <DAppProvider config={config}>{children}</DAppProvider>
    </>
  )
}

export default Layout
