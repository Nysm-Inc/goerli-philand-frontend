import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
import { objectMetadataList } from "~/types/object";
import { BalanceObject, ContractAbis, ObjectContractAddress, WallpaperContractAddress } from "~/types";

const useBalances = (contract: ObjectContractAddress | WallpaperContractAddress, account?: string, disabled?: boolean): BalanceObject[] => {
  const { data } = useContractRead({
    addressOrName: contract,
    contractInterface: ContractAbis[contract],
    functionName: "balanceOfBatch",
    args: account
      ? [
          Object.keys(objectMetadataList[contract]).map(() => account),
          Object.values(objectMetadataList[contract]).map((metadata) => metadata.tokenId),
        ]
      : null,
    watch: true,
    enabled: !!account && !disabled,
  });

  return data
    ? data.reduce((memo, balance, i) => {
        const amount = BigNumber.from(balance).toNumber();
        if (amount > 0) {
          return [
            ...memo,
            {
              contract: contract,
              // todo
              // tokenId: i + 1,
              tokenId: Object.values(objectMetadataList[contract]).find((v, idx) => i === idx)?.tokenId,
              amount: BigNumber.from(balance).toNumber(),
            },
          ];
        } else {
          return memo;
        }
      }, [])
    : [];
};

export default useBalances;
