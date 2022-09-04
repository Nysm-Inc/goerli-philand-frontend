import { useContractRead } from "wagmi";
import { BigNumber } from "ethers";
import MapAbi from "~/abi/map.json";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { nullAddress, PhiObject } from "~/types";

const useViewPhiland = (
  ens?: string | null
): { owner: string; isFetchedOwner: boolean; phiObjects: (PhiObject & { removeIdx: number })[] } => {
  const { data: owner, isFetched: isFetchedOwner } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "ownerOfPhiland",
    args: ens ? [ens.slice(0, -4)] : null,
    watch: true,
  });
  const { data: objects } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "viewPhiland",
    args: ens ? [ens.slice(0, -4)] : null,
    watch: true,
  });

  return {
    // @ts-ignore
    owner: owner || nullAddress,
    isFetchedOwner,
    phiObjects: objects
      ? objects.reduce((memo, object, idx) => {
          const tokenId = BigNumber.from(object[1]).toNumber();
          if (tokenId > 0) {
            return [
              ...memo,
              {
                removeIdx: idx,
                contractAddress: object[0],
                tokenId: tokenId,
                xStart: BigNumber.from(object[2]).toNumber(),
                yStart: BigNumber.from(object[3]).toNumber(),
                xEnd: BigNumber.from(object[4]).toNumber(),
                yEnd: BigNumber.from(object[5]).toNumber(),
                link: { title: object[6]?.title || "", url: object[6]?.url || "" },
              } as PhiObject,
            ];
          } else {
            return memo;
          }
        }, [])
      : [],
  };
};

export default useViewPhiland;
