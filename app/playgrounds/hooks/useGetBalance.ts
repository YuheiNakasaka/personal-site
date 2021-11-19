import { GetBalanceResponse } from "../models/balance"

export type UseGetBalanceType = {
  balance: number
}

export const useGetBalance = () => {
  return async (address: string, chain: string): Promise<UseGetBalanceType> => {
    if (address && address !== "") {
      console.log("=== Requesting: useGetBalance ===")
      const response: GetBalanceResponse = await fetch(
        `/api/playgrounds/get_balance?address=${address}&chain=${chain}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => res.json())
      return {
        balance: parseFloat(response.balance),
      }
    } else {
      return {
        balance: 0.0,
      }
    }
  }
}
