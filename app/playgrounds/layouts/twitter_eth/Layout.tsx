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
