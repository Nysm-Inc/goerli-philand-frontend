import { BigNumber } from "ethers";
import { PhiObjectAbi } from "~/abi";
import { PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { phiObjectMetadataList } from "~/types/object";
import { BalanceObject } from "~/types";
import { useContractRead } from "wagmi";

const useBalances = (account?: string, disabled?: boolean): BalanceObject[] => {
  const { data, isFetching } = useContractRead(
    {
      addressOrName: PHI_OBJECT_CONTRACT_ADDRESS,
      contractInterface: PhiObjectAbi,
    },
    "balanceOfBatch",
    {
      args: account
        ? [
            Object.keys(phiObjectMetadataList[PHI_OBJECT_CONTRACT_ADDRESS]).map(() => account),
            Object.keys(phiObjectMetadataList[PHI_OBJECT_CONTRACT_ADDRESS]).map((tokenId) => tokenId),
          ]
        : [],
      watch: true,
      enabled: !disabled,
      onSuccess(data) {
        //
      },
    }
  );

  return !isFetching && data
    ? data.reduce((memo, balance, i) => {
        const amount = BigNumber.from(balance).toNumber();
        if (amount > 0) {
          return [
            ...memo,
            {
              contract: PHI_OBJECT_CONTRACT_ADDRESS,
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