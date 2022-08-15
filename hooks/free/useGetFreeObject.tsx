import { useContext, useEffect } from "react";
import { useDeprecatedContractWrite, useWaitForTransaction } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import { FREE_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import FreeObjectAbi from "~/abi/freeobject.json";
import { AppContext } from "~/contexts";
import { getFastestGasWei } from "~/utils/gas";

const useGetFreeObject = (): { getFreeObject: (tokenIds: number[]) => Promise<TransactionResponse | undefined> } => {
  const { addTx } = useContext(AppContext);
  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useDeprecatedContractWrite({
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
      const overrides = await getFastestGasWei();
      return writeAsync({ args: calldata, overrides });
    },
  };
};

export default useGetFreeObject;
