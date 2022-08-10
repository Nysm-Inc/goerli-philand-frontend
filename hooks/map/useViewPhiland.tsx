import { useContext, useEffect } from "react";
import { useContractRead } from "wagmi";
import { BigNumber } from "ethers";
import { MapAbi } from "~/abi";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { nullAddress, PhiObject } from "~/types";
import { AppContext } from "~/contexts";

const useViewPhiland = (ens?: string | null): { owner: string; phiObjects: (PhiObject & { removeIdx: number })[] } => {
  const { blockNumber } = useContext(AppContext);
  const { data: objects, refetch: refetchViewPhiland } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "viewPhiland",
    args: ens ? [ens.slice(0, -4)] : null,
  });
  const { data: links, refetch: refetchViewLinks } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "viewLinks",
    args: ens ? [ens.slice(0, -4)] : null,
  });
  const { data: owner, refetch: refetchOwnerOfPhiland } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "ownerOfPhiland",
    args: ens ? [ens.slice(0, -4)] : null,
  });

  useEffect(() => {
    refetchViewPhiland();
    refetchViewLinks();
    refetchOwnerOfPhiland();
  }, [blockNumber]);

  return {
    // @ts-ignore
    owner: owner || nullAddress,
    phiObjects:
      objects && links
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
                  link: { title: links[idx]?.[0], url: links[idx]?.[1] },
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
