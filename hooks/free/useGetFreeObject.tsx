import { useContractWrite, useWaitForTransaction } from "wagmi";
import { TransactionResponse } from "@ethersproject/providers";
import { FREE_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { FreeObjectAbi } from "~/abi";
import { Tx } from "~/types/wagmi";

const useGetFreeObject = (): { getFreeObject: (tokenId: number) => Promise<TransactionResponse | undefined>; tx: Tx } => {
  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: FREE_OBJECT_CONTRACT_ADDRESS,
    contractInterface: FreeObjectAbi,
    functionName: "getFreeObject",
  });
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  return {
    getFreeObject: async (tokenId: number) => {
      const calldata = [tokenId];
      return writeAsync({ args: calldata });
    },
    tx: {
      hash: data?.hash,
      tmpStatus,
      status,
    },
  };
};

export default useGetFreeObject;
