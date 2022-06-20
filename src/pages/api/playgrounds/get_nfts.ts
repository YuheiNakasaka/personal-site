import { GetNFTResponse, NFTMetaData } from "../../../models/nft";
import type { NextApiRequest, NextApiResponse } from "next";

const iPFSToHTTP = (url: string) => {
  if (url.indexOf("ipfs://ipfs/") !== -1) {
    return `https://ipfs.io/ipfs/${url.split("ipfs://ipfs/")[1]}`;
  } else if (url.indexOf("ipfs://") !== -1) {
    return `https://ipfs.io/ipfs/${url.split("ipfs://")[1]}`;
  }
  return url;
};

const validImageUrl = (metadata: NFTMetaData) => {
  if (metadata.image && metadata.image !== null && metadata.image !== "") {
    metadata.image = iPFSToHTTP(metadata.image);
  } else if (
    metadata.image_url &&
    metadata.image_url !== null &&
    metadata.image_url !== ""
  ) {
    metadata.image = iPFSToHTTP(metadata.image_url);
  } else {
    metadata.image = "https://via.placeholder.com/150";
  }
  return metadata;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const endResp = {
      total: 0,
      page: 0,
      page_size: 500,
      result: [],
      status: "",
    };
    const {
      query: { address, chain },
    } = req;
    if (address && address !== "" && chain && chain !== "") {
      const input = address.toString();
      const parsedInput = input.trim().toLocaleLowerCase();
      console.log(
        `https://deep-index.moralis.io/api/v2/${parsedInput}/nft?chain=${chain}&format=decimal`
      );
      const response: GetNFTResponse = await fetch(
        `https://deep-index.moralis.io/api/v2/${parsedInput}/nft?chain=${chain}&format=decimal`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-Key": `${process.env.MOLARIS_REST_API_KEY}`,
          },
        }
      ).then((res) => res.json());
      const result = response.result
        .filter((item) => item.metadata != null)
        .map((item) => {
          let metadata: NFTMetaData = JSON.parse(item.metadata.toString());
          item.metadata = validImageUrl(metadata);
          return item;
        });
      response.result = result;
      res.statusCode = 200;
      res.setHeader("Contentn-Type", "application/json");
      return res.end(JSON.stringify(response));
    } else {
      res.statusCode = 400;
      res.setHeader("Contentn-Type", "application/json");
      return res.end(JSON.stringify(endResp));
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Contentn-Type", "application/json");
    return res.end(JSON.stringify({}));
  }
};
export default handler;
