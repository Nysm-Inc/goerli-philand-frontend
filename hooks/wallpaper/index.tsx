import { useContractWrite, useWaitForTransaction } from "wagmi";
import { TransactionResponse } from "@ethersproject/providers";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { WallpaperAbi } from "~/abi";
import { Tx } from "~/types/tx";

const useWallpaper = (): { batchWallPaper: (tokenIds: number[]) => Promise<TransactionResponse | undefined>; tx: Tx } => {
  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: WALLPAPER_CONTRACT_ADDRESS,
    contractInterface: WallpaperAbi,
    functionName: "batchWallPaper",
  });
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  return {
    batchWallPaper: async (tokenIds: number[]) => {
      const calldata = [tokenIds];
      return writeAsync({ args: calldata });
    },
    tx: {
      hash: data?.hash,
      tmpStatus,
      status,
    },
  };
};

export default useWallpaper;
