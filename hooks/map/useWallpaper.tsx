import { TransactionResponse } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { MapAbi } from "~/abi";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { nullAddress, Wallpaper } from "~/types";
import { Tx } from "~/types/wagmi";

const useCheckWallpaper = (
  ens?: string | null,
  disabled?: boolean
): [Wallpaper | undefined, { withdrawWallpaper: () => Promise<TransactionResponse | undefined>; tx: Tx }] => {
  const { data } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "checkWallPaper",
    args: ens ? [ens.slice(0, -4)] : null,
    watch: true,
    enabled: !!ens && !disabled,
  });

  const {
    data: writeData,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "withdrawWallPaper",
  });
  const { status } = useWaitForTransaction({ hash: writeData?.hash || "" });

  return [
    data && data[0] !== nullAddress
      ? {
          contractAddress: data[0],
          tokenId: BigNumber.from(data[1]).toNumber(),
          timestamp: BigNumber.from(data[2]).toNumber(),
        }
      : undefined,
    {
      withdrawWallpaper: async () => {
        if (!ens) return;

        const calldata = [ens.slice(0, -4)];
        return writeAsync({ args: calldata });
      },
      tx: {
        hash: writeData?.hash,
        tmpStatus,
        status,
      },
    },
  ];
};

export default useCheckWallpaper;
