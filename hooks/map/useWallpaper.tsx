import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
import MapAbi from "~/abi/map.json";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { nullAddress, Wallpaper } from "~/types";

const useWallpaper = (ens?: string | null): { wallpaper: Wallpaper | undefined; refetch: () => void } => {
  const { data, refetch } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "checkWallPaper",
    args: ens ? [ens.slice(0, -4)] : null,
  });

  return {
    wallpaper:
      data && data[0] !== nullAddress
        ? {
            contract: data[0],
            tokenId: BigNumber.from(data[1]).toNumber(),
          }
        : undefined,
    refetch,
  };
};

export default useWallpaper;
