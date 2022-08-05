import { useContext, useEffect } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import { FREE_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { FreeObjectAbi } from "~/abi";
import { AppContext } from "~/contexts";

const useGetFreeObject = (): { getFreeObject: (tokenIds: number[]) => Promise<TransactionResponse | undefined> } => {
  const { addTx } = useContext(AppContext);
  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: FREE_OBJECT_CONTRACT_ADDRESS,
    contractInterface: FreeObjectAbi,
    functionName: "batchGetFreeObject",
  });
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  useEffect(() => {
    addTx({
      hash: data?.hash,
      tmpStatus,
      status,
      action: "Claiming Free Objects",
    });
  }, [tmpStatus, status]);

  return {
    getFreeObject: async (tokenIds: number[]) => {
      const calldata = [tokenIds];
      return writeAsync({ args: calldata });
    },
  };
};

export default useGetFreeObject;
