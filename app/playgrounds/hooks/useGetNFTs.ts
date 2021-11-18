import { GetNFTResponse } from "../models/nft"

const mockObject: GetNFTResponse = {
  total: 1,
  page: 0,
  page_size: 500,
  result: [
    {
      token_address: "0x495f947276749ce646f68ac8c248420045cb7b5e",
      token_id: "78505287876114873744754849542832275063014098647883046073289702868033529184266",
      amount: "1",
      owner_of: "0x1faf5c84934fadaaa23eb7e6c7b284e98d63d75b",
      block_number: "13325392",
      block_number_minted: "13306571",
      contract_type: "ERC1155",
      token_uri:
        "https://api.opensea.io/api/v1/metadata/0x495f947276749Ce646f68AC8c248420045cb7b5e/0xad906b1684063008c16488067e7545148b0bf2b800000000000017000000000a",
      metadata:
        '{"name":"First supporter\'s card","description":null,"external_link":null,"image":"https://lh3.googleusercontent.com/xAN_Asxta96QN1bxHCUd6Ca6MW4F5ke00JpZeqarY1SAWSR1znzF9Y-Mok6KmvE1a5cSgx4tw6TPjO8VNpOt3CdAKWUpl3Srp4rKYbs","animation_url":"https://storage.opensea.io/files/b887252e081e1c8536ad4eb1179f8513.mp4"}',
      synced_at: "2021-11-16T05:59:39.959Z",
      name: "OpenSea Shared Storefront",
      symbol: "OPENSTORE",
    },
  ],
  status: "SYNCING",
}

export const useGetNFTs = () => {
  return async (address: string, chain: string) => {
    if (address && address !== "") {
      console.log("=== Requesting: useGetNFTs ===")
      const response = await fetch(`/api/playgrounds/get_nfts?address=${address}&chain=${chain}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json())
      return response
    } else {
      return {
        total: 0,
        page: 0,
        page_size: 500,
        result: [],
        status: "",
      }
    }
  }
}
