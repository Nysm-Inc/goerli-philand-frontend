import { useContractRead } from "wagmi";
import { BigNumber } from "ethers";
import { MapAbi } from "~/abi";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { PhiObject } from "~/types";

const useViewPhiland = (ens?: string | null, disabled?: boolean): { owner: string; phiObjects: (PhiObject & { removeIdx: number })[] } => {
  const { data: objects } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "viewPhiland",
    args: ens ? [ens.slice(0, -4)] : null,
    watch: true,
    enabled: !!ens && !disabled,
  });
  const { data: links } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "viewLinks",
    args: ens ? [ens.slice(0, -4)] : null,
    watch: true,
    enabled: !!ens && !disabled,
  });
  const { data: owner } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "ownerOfPhiland",
    args: ens ? [ens.slice(0, -4)] : null,
    watch: true,
    enabled: !!ens && !disabled,
  });

  return {
    // @ts-ignore
    owner: owner || "",
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
