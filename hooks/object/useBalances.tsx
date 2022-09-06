import { useEffect, useMemo } from "react";
import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
import { objectMetadataList } from "~/types/object";
import { BalanceObject, ObjectContractAddress, WallpaperContractAddress } from "~/types";
import { ContractAbis } from "~/abi/types";

const useBalances = (
  contract: ObjectContractAddress | WallpaperContractAddress,
  account?: string,
  refresh?: boolean
): { balances: BalanceObject[]; refetch: () => void } => {
  const metadata = useMemo(() => Object.values(objectMetadataList[contract]), [contract]);
  const { data, refetch } = useContractRead({
    addressOrName: contract,
    contractInterface: ContractAbis[contract],
    functionName: "balanceOfBatch",
    args: account ? [metadata.map(() => account), metadata.map((meta) => meta.tokenId)] : null,
  });

  useEffect(() => {
    refetch();
  }, [refresh]);

  return {
    balances: data
      ? metadata.reduce((memo, meta, i) => {
          const amount = BigNumber.from(data[i]).toNumber();
          return amount > 0 ? [...memo, { contract: contract, tokenId: meta.tokenId, amount: amount }] : memo;
        }, [] as BalanceObject[])
      : [],
    refetch,
  };
};

export default useBalances;
