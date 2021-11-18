import { BlitzApiRequest, BlitzApiResponse } from "next"
import { ethers } from "ethers"

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const endResp = {
    address: "",
  }
  if (req.query.address && req.query.address !== "") {
    const input = req.query.address.toString()
    const parsedInput = input.trim().toLocaleLowerCase()
    if (parsedInput.endsWith(".eth")) {
      const provider = new ethers.providers.JsonRpcProvider(
        `${process.env.MORALIS_SPEEDY_MAINNET_URL}`
      )
      const address = await provider.resolveName(`${parsedInput}`)
      endResp.address = `${address}`
      res.statusCode = 200
      res.setHeader("Contentn-Type", "application/json")
      return res.end(JSON.stringify(endResp))
    }
    res.statusCode = 400
    res.setHeader("Contentn-Type", "application/json")
    return res.end(JSON.stringify(endResp))
  } else {
    res.statusCode = 400
    res.setHeader("Contentn-Type", "application/json")
    return res.end(JSON.stringify(endResp))
  }
}
export default handler