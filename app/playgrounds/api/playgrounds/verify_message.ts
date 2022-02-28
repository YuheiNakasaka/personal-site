import { BlitzApiRequest, BlitzApiResponse } from "next"
import crypto from "crypto"
import { utils } from "ethers"

const getMessage = (address: string) => {
  const token = crypto
    .createHash("sha256")
    .update(`${address}${process.env.SIGNER_TOKEN_SALT}`)
    .digest("hex")
  const bytes = utils.toUtf8Bytes(token)
  const digest = utils.keccak256(bytes)
  return utils.arrayify(digest)
}

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  if (req.method !== "GET") {
    return res.status(404).end()
  }

  if (!req.query.address || !req.query.sig || req.query.address === "" || req.query.sig === "") {
    return res.status(400).end()
  }

  const address = req.query.address.toString()
  const signature = req.query.sig.toString()
  const recoveredAddress = utils.verifyMessage(getMessage(address), signature)
  if (address === recoveredAddress) {
    return res.end(
      JSON.stringify({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/playgrounds/personal_sign?status=success`,
      })
    )
  } else {
    return res.end(
      JSON.stringify({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/playgrounds/personal_sign?status=failure`,
      })
    )
  }
}

export default handler
