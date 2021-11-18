import * as React from "react"
import { NFTItem } from "../models/nft"

export interface AssetSearchContextType {
  text: string
  setText: (t: string) => void
  address: string
  setAddress: (t: string) => void
  chain: string
  setChain: (t: string) => void
  totalNFT: number
  setTotalNFT: (t: number) => void
  nftItems: NFTItem[]
  setNFTItems: (t: NFTItem[]) => void
  isLoading: boolean
  setLoading: (t: boolean) => void
  balance: number
  setBalance: (t: number) => void
}

export const AssetSearchContext = React.createContext<AssetSearchContextType>({
  text: "",
  setText: (_: string) => {},
  address: "0x",
  setAddress: (t: string) => {},
  chain: "eth",
  setChain: (t: string) => {},
  totalNFT: 0,
  setTotalNFT: (t: number) => {},
  nftItems: [],
  setNFTItems: (_: NFTItem[]) => {},
  isLoading: false,
  setLoading: (_: boolean) => {},
  balance: 0.0,
  setBalance: (t: number) => {},
})

export const AssetSearchContextProvider: React.FC = ({ children }) => {
  const context: AssetSearchContextType = React.useContext(AssetSearchContext)
  const [text, setText] = React.useState(context.text)
  const [address, setAddress] = React.useState(context.address)
  const [chain, setChain] = React.useState(context.chain)
  const [totalNFT, setTotalNFT] = React.useState(context.totalNFT)
  const [nftItems, setNFTItems] = React.useState(context.nftItems)
  const [isLoading, setLoading] = React.useState(context.isLoading)
  const [balance, setBalance] = React.useState(context.balance)
  const newContext: AssetSearchContextType = {
    text,
    setText,
    address,
    setAddress,
    chain,
    setChain,
    totalNFT,
    setTotalNFT,
    nftItems,
    setNFTItems,
    isLoading,
    setLoading,
    balance,
    setBalance,
  }
  return <AssetSearchContext.Provider value={newContext}>{children}</AssetSearchContext.Provider>
}
