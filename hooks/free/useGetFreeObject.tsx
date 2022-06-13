import { useContractWrite, useWaitForTransaction } from "wagmi";
import { FREE_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { FreeObjectAbi } from "~/abi";
import { Tx } from "~/types/wagmi";

const useGetFreeObject = (): { getFreeObject: (tokenId: number) => Promise<void>; tx: Tx } => {
  const {
    data,
    write,
    status: tmpStatus,
  } = useContractWrite(
    {
      addressOrName: FREE_OBJECT_CONTRACT_ADDRESS,
      contractInterface: FreeObjectAbi,
    },
    "getFreeObject"
  );
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  return {
    getFreeObject: async (tokenId: number) => {
      const calldata = [tokenId];
      write({ args: calldata });
    },
    tx: {
      hash: data?.hash,
      tmpStatus,
      status,
    },
  };
};

export default useGetFreeObject;
