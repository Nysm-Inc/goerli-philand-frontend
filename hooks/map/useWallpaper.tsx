import { useContext, useEffect } from "react";
import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
import { MapAbi } from "~/abi";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { AppContext } from "~/contexts";
import { nullAddress, Wallpaper } from "~/types";

const useWallpaper = (ens?: string | null): Wallpaper | undefined => {
  const { blockNumber } = useContext(AppContext);
  const { data, refetch } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "checkWallPaper",
    args: ens ? [ens.slice(0, -4)] : null,
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  return data && data[0] !== nullAddress
    ? {
        contractAddress: data[0],
        tokenId: BigNumber.from(data[1]).toNumber(),
      }
    : undefined;
};

export default useWallpaper;
