import { useContext, useEffect } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import { PREMIUM_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { PremiumObjectAbi } from "~/abi";
import { BigNumber, ethers } from "ethers";
import { objectMetadataList } from "~/types/object";
import { AppContext } from "~/contexts";

const useBuyPremiumObject = (): {
  buyPremiumObject: (tokenIds: number[]) => Promise<TransactionResponse | undefined>;
} => {
  const { addTx } = useContext(AppContext);
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

  useEffect(() => {
    addTx({
      hash: data?.hash,
      tmpStatus,
      status,
      action: "Claiming Premium Objects",
    });
  }, [tmpStatus, status]);

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
  };
};

export default useBuyPremiumObject;
