import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";
import { PhiMapAbi } from "~/abi";
import { PHI_MAP_CONTRACT_ADDRESS } from "~/constants";
import { PhiObject } from "~/types";

const useViewPhiland = (ens: string | null | undefined, provider?: Web3Provider): PhiObject[] => {
  const [objects, setObjects] = useState<PhiObject[]>([]);

  useEffect(() => {
    if (!ens || !provider) return;

    (async () => {
      const singer = provider.getSigner();
      const contract = new ethers.Contract(PHI_MAP_CONTRACT_ADDRESS, PhiMapAbi, singer);

      const calldata = [ens.slice(0, -4)];
      const phimap = await contract.viewPhiland(...calldata);

      // @ts-ignore
      const parsed: PhiObject[] = phimap.map((object) => {
        return {
          contractAddress: object.contractAddress,
          tokenId: BigNumber.from(object.tokenId).toNumber(),
          xStart: BigNumber.from(object.xStart).toNumber(),
          yStart: BigNumber.from(object.yStart).toNumber(),
          xEnd: BigNumber.from(object.xEnd).toNumber(),
          yEnd: BigNumber.from(object.yEnd).toNumber(),
        };
      });
      setObjects(parsed.filter((object) => object.tokenId));
    })();
  }, [ens, provider]);

  return objects;
};

export default useViewPhiland;
