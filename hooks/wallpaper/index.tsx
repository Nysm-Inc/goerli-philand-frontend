import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { TransactionResponse } from "@ethersproject/providers";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { WallpaperAbi } from "~/abi";
import { Tx } from "~/types/wagmi";

const useWallpaper = (ens?: string, disabled?: boolean): [{ tx: Tx }] => {
  const { data } = useContractRead({
    addressOrName: WALLPAPER_CONTRACT_ADDRESS,
    contractInterface: WallpaperAbi,
    functionName: "",
    args: ens ? [ens.slice(0, -4)] : null,
    watch: true,
    enabled: !!ens && !disabled,
  });

  const {
    data: writeData,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: WALLPAPER_CONTRACT_ADDRESS,
    contractInterface: WallpaperAbi,
    functionName: "",
  });
  const { status } = useWaitForTransaction({ hash: writeData?.hash || "" });

  return [
    {
      tx: {
        hash: writeData?.hash,
        tmpStatus,
        status,
      },
    },
  ];
};

export default useWallpaper;
