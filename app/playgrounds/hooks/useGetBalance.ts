import { GetBalanceResponse } from "../models/balance"

const mockObject: GetBalanceResponse = {
  balance: "188624396095347717",
}

export const useGetBalance = () => {
  return async (address: string, chain: string) => {
    if (address !== "") {
      console.log("=== Requesting: useGetBalance ===")
      const response = await fetch(
        `/api/playgrounds/get_balance?address=${address}&chain=${chain}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => res.json())
      return response
    } else {
      return {
        balance: 0.0,
      }
    }
  }
}
