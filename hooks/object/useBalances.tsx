import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
import { objectMetadataList } from "~/types/object";
import { BalanceObject, ContractAbis, ObjectContractAddress } from "~/types";

const useBalances = (contract: ObjectContractAddress, account?: string, disabled?: boolean): BalanceObject[] => {
  const { data, isFetching } = useContractRead({
    addressOrName: contract,
    contractInterface: ContractAbis[contract],
    functionName: "balanceOfBatch",
    args: account
      ? [Object.keys(objectMetadataList[contract]).map(() => account), Object.keys(objectMetadataList[contract]).map((tokenId) => tokenId)]
      : null,
    watch: true,
    enabled: !!account && !disabled,
  });

  return !isFetching && data
    ? data.reduce((memo, balance, i) => {
        const amount = BigNumber.from(balance).toNumber();
        if (amount > 0) {
          return [
            ...memo,
            {
              contract: contract,
              tokenId: i + 1,
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
