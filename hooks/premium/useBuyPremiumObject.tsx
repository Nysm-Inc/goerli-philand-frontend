import { useContractWrite, useWaitForTransaction } from "wagmi";
import { Provider, TransactionResponse } from "@ethersproject/providers";
import { PREMIUM_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { PremiumObjectAbi } from "~/abi";
import { Contract, Signer } from "ethers";
import { Tx } from "~/types/wagmi";

const useBuyPremiumObject = (
  signerOrProvider?: Signer | Provider
): { buyPremiumObject: (tokenId: number) => Promise<TransactionResponse | undefined>; tx: Tx } => {
  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: PREMIUM_OBJECT_CONTRACT_ADDRESS,
    contractInterface: PremiumObjectAbi,
    functionName: "buyObject",
  });
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  return {
    buyPremiumObject: async (tokenId: number) => {
      const contract = new Contract(PREMIUM_OBJECT_CONTRACT_ADDRESS, PremiumObjectAbi, signerOrProvider);
      const tokenPrice = await contract.getTokenPrice(tokenId);
      const calldata = [tokenId];
      return writeAsync({ args: calldata, overrides: { value: tokenPrice } });
    },
    tx: {
      hash: data?.hash,
      tmpStatus,
      status,
    },
  };
};

export default useBuyPremiumObject;
