import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(404).end();
  }

  if (!req.query.address) {
    return res.status(400).end();
  }

  // 簡便のためとりあえず固定で生成している
  const token = `${req.query.address}${process.env.SIGNER_TOKEN_SALT}`;
  return res.end(
    JSON.stringify({
      token: crypto.createHash("sha256").update(token).digest("hex"),
    })
  );
};

export default handler;
