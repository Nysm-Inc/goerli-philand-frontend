import { useCallback } from "react";
import { useContractRead } from "wagmi";
import { BigNumber } from "ethers";
import MapAbi from "~/abi/map.json";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { nullAddress, PhiObject } from "~/types";

const useViewPhiland = (
  ens?: string | null
): {
  owner: string;
  isFetchedOwner: boolean;
  phiObjects: (PhiObject & { removeIdx: number })[];
  refetchPhiObjects: () => void;
} => {
  const {
    data: owner,
    isFetched: isFetchedOwner,
    refetch: refetchOwner,
  } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "ownerOfPhiland",
    args: ens ? [ens.slice(0, -4)] : null,
  });
  const { data: objects, refetch: refetchPhiland } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "viewPhiland",
    args: ens ? [ens.slice(0, -4)] : null,
  });
  const refetchPhiObjects = useCallback(() => (refetchOwner(), refetchPhiland()), []);

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
                link: { title: object[6]?.[0] || "", url: object[6]?.[1] || "" },
              },
            ];
          } else {
            return memo;
          }
        }, [])
      : [],
    refetchPhiObjects,
  };
};

export default useViewPhiland;
