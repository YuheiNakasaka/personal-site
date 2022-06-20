import { useEthers } from "@usedapp/core";
import { utils, Contract } from "ethers";
import ABI from "../resources/nft-login-abi.json";

const TOKEN_ID = 1;
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const useCallNFTLogin = () => {
  const { library } = useEthers();
  const inteface = new utils.Interface(ABI.abi);
  const contract = new Contract(
    CONTRACT_ADDRESS,
    inteface,
    library?.getSigner()
  );
  return async (address: string): Promise<boolean> => {
    const balance = await contract.balanceOf(address, TOKEN_ID);
    return parseInt(balance.toString()) > 0;
  };
};
