import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
import { objectMetadataList } from "~/types/object";
import { BalanceObject, ContractAbis, ObjectContractAddress, WallpaperContractAddress } from "~/types";
import { useMemo } from "react";

const useBalances = (contract: ObjectContractAddress | WallpaperContractAddress, account?: string, disabled?: boolean): BalanceObject[] => {
  const metadata = useMemo(() => Object.values(objectMetadataList[contract]), [contract]);
  const { data } = useContractRead({
    addressOrName: contract,
    contractInterface: ContractAbis[contract],
    functionName: "balanceOfBatch",
    args: account ? [metadata.map(() => account), metadata.map((meta) => meta.tokenId)] : null,
    watch: true,
    enabled: !!account && !disabled,
  });

  return data
    ? metadata.reduce((memo, meta, i) => {
        const amount = BigNumber.from(data[i]).toNumber();
        if (amount > 0) {
          return [
            ...memo,
            {
              contract: contract,
              tokenId: meta.tokenId,
              amount: amount,
            },
          ];
        } else {
          return memo;
        }
      }, [] as BalanceObject[])
    : [];
};

export default useBalances;
