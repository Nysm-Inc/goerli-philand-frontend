import { useContractWrite, useWaitForTransaction } from "wagmi";
import { TransactionResponse } from "@ethersproject/providers";
import { PREMIUM_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { PremiumObjectAbi } from "~/abi";
import { BigNumber, ethers } from "ethers";
import { Tx } from "~/types/tx";
import { objectMetadataList } from "~/types/object";

const useBuyPremiumObject = (): {
  buyPremiumObject: (tokenIds: number[]) => Promise<TransactionResponse | undefined>;
  tx: Tx;
} => {
  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: PREMIUM_OBJECT_CONTRACT_ADDRESS,
    contractInterface: PremiumObjectAbi,
    functionName: "batchBuyObject",
  });
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  return {
    buyPremiumObject: async (tokenIds: number[]) => {
      const calldata = [tokenIds];
      return writeAsync({
        args: calldata,
        overrides: {
          value: tokenIds
            .reduce((sum, tokenId) => {
              const metadata = objectMetadataList[PREMIUM_OBJECT_CONTRACT_ADDRESS][tokenId];
              const wei = ethers.utils.parseEther(metadata.price.toString());
              return sum.add(wei);
            }, BigNumber.from(0))
            .toString(),
        },
      });
    },
    tx: {
      hash: data?.hash,
      tmpStatus,
      status,
      action: "Claiming Premium Objects",
    },
  };
};

export default useBuyPremiumObject;
