import type { NextApiRequest, NextApiResponse } from "next";
import ABI721 from "../../../resources/erc721-abi.json";
import ABI1155 from "../../../resources/erc1155-abi.json";
import { Contract, providers, utils } from "ethers";

const checkERC721 = async (
  signer: providers.JsonRpcSigner,
  myAddress: string,
  contractAddress: string,
  tokenId?: string
) => {
  const contractInterface = new utils.Interface(ABI721.abi);
  const contract = new Contract(contractAddress, contractInterface, signer);
  if (!tokenId) {
    const balance = await contract.balanceOf(myAddress);
    return Number(balance.toString()) >= 1;
  } else {
    const ownerAddress = await contract.ownerOf(tokenId);
    return ownerAddress === myAddress;
  }
};

const checkERC1155 = async (
  signer: providers.JsonRpcSigner,
  myAddress: string,
  contractAddress: string,
  tokenId?: string
) => {
  const contractInterface = new utils.Interface(ABI1155.abi);
  const contract = new Contract(contractAddress, contractInterface, signer);
  if (tokenId) {
    const balance = await contract.balanceOf(myAddress, tokenId);
    return Number(balance.toString()) >= 1;
  }
  return false;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(404).end();
  }

  if (
    !req.query.myAddress ||
    req.query.myAddress === "" ||
    !req.query.contractAddress ||
    req.query.contractAddress === ""
  ) {
    return res.status(400).end();
  }
  const myAddress = req.query.myAddress.toString();
  const contractAddress = req.query.contractAddress.toString();
  const tokenId = req.query.tokenId ? req.query.tokenId.toString() : "";
  const provider = new providers.JsonRpcProvider(
    `${process.env.MORALIS_SPEEDY_MAINNET_URL}`
  );
  const signer = provider.getSigner(myAddress);

  let result = false;
  try {
    result = await checkERC721(signer, myAddress, contractAddress, tokenId);
  } catch (e) {
    console.log(e);
    try {
      result = await checkERC1155(signer, myAddress, contractAddress, tokenId);
    } catch (e) {
      console.log(e);
      result = false;
    }
  }

  res.end(JSON.stringify({ result }));
};

export default handler;
