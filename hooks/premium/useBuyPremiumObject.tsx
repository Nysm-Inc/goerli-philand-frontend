import { useContractWrite, useWaitForTransaction } from "wagmi";
import { PREMIUM_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { PremiumObjectAbi } from "~/abi";
import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import { Tx } from "~/types/wagmi";

const useBuyPremiumObject = (signerOrProvider?: Signer | Provider): { buyPremiumObject: (tokenId: number) => Promise<void>; tx: Tx } => {
  const {
    data,
    write,
    status: tmpStatus,
  } = useContractWrite(
    {
      addressOrName: PREMIUM_OBJECT_CONTRACT_ADDRESS,
      contractInterface: PremiumObjectAbi,
    },
    "buyObject"
  );
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  return {
    buyPremiumObject: async (tokenId: number) => {
      const contract = new Contract(PREMIUM_OBJECT_CONTRACT_ADDRESS, PremiumObjectAbi, signerOrProvider);
      const tokenPrice = await contract.getTokenPrice(tokenId);
      const calldata = [tokenId];
      write({ args: calldata, overrides: { value: tokenPrice } });
    },
    tx: {
      hash: data?.hash,
      tmpStatus,
      status,
    },
  };
};

export default useBuyPremiumObject;
