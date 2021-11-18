import { GetBalanceResponse } from "app/playgrounds/models/balance"
import { BlitzApiRequest, BlitzApiResponse } from "next"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const endResp = {
    balance: 0.0,
  }
  const {
    query: { address, chain },
  } = req
  if (address && address !== "" && chain && chain !== "") {
    const input = address.toString()
    const parsedInput = input.trim().toLocaleLowerCase()
    const response: GetBalanceResponse = await fetch(
      `https://deep-index.moralis.io/api/v2/${parsedInput}/balance?chain=${chain}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-API-Key": `${process.env.MOLARIS_REST_API_KEY}`,
        },
      }
    ).then((res) => res.json())
    endResp.balance = parseInt(response.balance) / 1000000000000000000
    res.statusCode = 200
    res.setHeader("Contentn-Type", "application/json")
    return res.end(JSON.stringify(endResp))
  } else {
    res.statusCode = 400
    res.setHeader("Contentn-Type", "application/json")
    return res.end(JSON.stringify(endResp))
  }
}
export default handler
