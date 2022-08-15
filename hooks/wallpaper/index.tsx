import { useContext, useEffect } from "react";
import { useDeprecatedContractWrite, useWaitForTransaction } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import WallpaperAbi from "~/abi/wallpaper.json";
import { AppContext } from "~/contexts";
import { getFastestGasWei } from "~/utils/gas";

const useGetWallpaper = (): { batchWallPaper: (tokenIds: number[]) => Promise<TransactionResponse | undefined> } => {
  const { addTx } = useContext(AppContext);
  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useDeprecatedContractWrite({
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
      const overrides = await getFastestGasWei();
      return writeAsync({ args: calldata, overrides });
    },
  };
};

export default useGetWallpaper;
