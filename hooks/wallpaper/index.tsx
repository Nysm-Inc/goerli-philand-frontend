import { useContractWrite, useWaitForTransaction } from "wagmi";
import { TransactionResponse } from "@ethersproject/providers";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { WallpaperAbi } from "~/abi";
import { Tx } from "~/types/wagmi";

const useWallpaper = (): { getFreeWallpaper: (tokenId: number) => Promise<TransactionResponse | undefined>; tx: Tx } => {
  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: WALLPAPER_CONTRACT_ADDRESS,
    contractInterface: WallpaperAbi,
    functionName: "getFreeWallPaper",
  });
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  return {
    getFreeWallpaper: async (tokenId: number) => {
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

export default useWallpaper;
