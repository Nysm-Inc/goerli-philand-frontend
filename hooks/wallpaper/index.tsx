import { useContext, useEffect } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { WallpaperAbi } from "~/abi";
import { AppContext } from "~/contexts";

const useGetWallpaper = (): { batchWallPaper: (tokenIds: number[]) => Promise<TransactionResponse | undefined> } => {
  const { addTx } = useContext(AppContext);
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

  useEffect(() => {
    addTx({
      hash: data?.hash,
      tmpStatus,
      status,
      action: "get wallpaper",
    });
  }, [tmpStatus, status]);

  return {
    batchWallPaper: async (tokenIds: number[]) => {
      const calldata = [tokenIds];
      return writeAsync({ args: calldata });
    },
  };
};

export default useGetWallpaper;
