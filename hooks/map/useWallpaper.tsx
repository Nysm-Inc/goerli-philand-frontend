import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
import MapAbi from "~/abi/map.json";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { nullAddress, Wallpaper } from "~/types";

const useWallpaper = (ens?: string | null, disabled?: boolean): Wallpaper | undefined => {
  const { data } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "checkWallPaper",
    args: ens ? [ens.slice(0, -4)] : null,
    watch: true,
  });

  return data && data[0] !== nullAddress
    ? {
        contractAddress: data[0],
        tokenId: BigNumber.from(data[1]).toNumber(),
      }
    : undefined;
};

export default useWallpaper;
