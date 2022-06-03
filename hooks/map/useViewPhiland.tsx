import { useContractRead } from "wagmi";
import { BigNumber } from "ethers";
import { PhiMapAbi } from "~/abi";
import { PHI_MAP_CONTRACT_ADDRESS } from "~/constants";
import { PhiObject } from "~/types";

const useViewPhiland = (ens?: string | null): PhiObject[] => {
  const { data, isLoading, isFetching } = useContractRead(
    {
      addressOrName: PHI_MAP_CONTRACT_ADDRESS,
      contractInterface: PhiMapAbi,
    },
    "viewPhiland",
    {
      args: ens ? [ens.slice(0, -4)] : [],
      cacheOnBlock: true,
      watch: true,
      onSuccess(data) {
        //
      },
    }
  );

  return data
    ? data.map((object) => {
        return {
          contractAddress: object[0],
          tokenId: BigNumber.from(object[1]).toNumber(),
          xStart: BigNumber.from(object[2]).toNumber(),
          yStart: BigNumber.from(object[3]).toNumber(),
          xEnd: BigNumber.from(object[4]).toNumber(),
          yEnd: BigNumber.from(object[5]).toNumber(),
        };
      })
    : [];
};

export default useViewPhiland;
