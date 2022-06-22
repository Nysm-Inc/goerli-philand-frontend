import { useContractRead } from "wagmi";
import { BigNumber } from "ethers";
import { MapAbi } from "~/abi";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { PhiObject } from "~/types";

const useViewPhiland = (ens?: string | null, disabled?: boolean): (PhiObject & { removeIdx: number })[] => {
  const { data, isFetching } = useContractRead(
    {
      addressOrName: MAP_CONTRACT_ADDRESS,
      contractInterface: MapAbi,
    },
    "viewPhiland",
    {
      args: ens ? [ens.slice(0, -4)] : null,
      watch: true,
      enabled: !!ens && !disabled,
      onSuccess(data) {
        //
      },
    }
  );

  return !isFetching && data
    ? data.reduce((memo, object, idx) => {
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
            },
          ];
        } else {
          return memo;
        }
      }, [])
    : [];
};

export default useViewPhiland;
