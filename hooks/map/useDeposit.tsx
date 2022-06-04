import { useContractRead, useContractWrite } from "wagmi";
import { BigNumber } from "ethers";
import { PHI_MAP_CONTRACT_ADDRESS } from "~/constants";
import { PhiMapAbi } from "~/abi";
import { BalanceObject, DepositObject } from "~/types";

const useDeposit = (
  ens?: string | null,
  disabled?: boolean
): [DepositObject[], (args: BalanceObject[]) => void, (args: BalanceObject[]) => void] => {
  const { data, isFetching } = useContractRead(
    {
      addressOrName: PHI_MAP_CONTRACT_ADDRESS,
      contractInterface: PhiMapAbi,
    },
    "checkAllDepositStatus",
    {
      args: ens ? [ens.slice(0, -4)] : [],
      watch: true,
      enabled: !disabled,
      onSuccess(data) {
        //
      },
    }
  );
  const { write: deposit } = useContractWrite(
    {
      addressOrName: PHI_MAP_CONTRACT_ADDRESS,
      contractInterface: PhiMapAbi,
    },
    "batchDeposit"
  );
  const { write: undeposit } = useContractWrite(
    {
      addressOrName: PHI_MAP_CONTRACT_ADDRESS,
      contractInterface: PhiMapAbi,
    },
    "batchUnDeposit"
  );

  const onDeposit = async (args: { contract: string; tokenId: number; amount: number }[]) => {
    if (!ens) return;

    const calldata = [
      ens.slice(0, -4),
      args.map((arg) => arg.contract),
      args.map((arg) => arg.tokenId),
      args.map((arg) => arg.amount),
    ];
    return deposit({ args: calldata });
  };

  const onWithdraw = async (args: { contract: string; tokenId: number; amount: number }[]) => {
    if (!ens) return;

    const calldata = [
      ens.slice(0, -4),
      args.map((arg) => arg.contract),
      args.map((arg) => arg.tokenId),
      args.map((arg) => arg.amount),
    ];
    return undeposit({ args: calldata });
  };

  return [
    !isFetching && data
      ? data.reduce((memo, object) => {
          const amount = BigNumber.from(object[2]).toNumber();
          const used = BigNumber.from(object[3]).toNumber();
          if (amount - used > 0) {
            return [
              ...memo,
              {
                contractAddress: object[0],
                tokenId: BigNumber.from(object[1]).toNumber(),
                timestamp: BigNumber.from(object[4]).toNumber(),
                amount: amount,
                used: used,
              },
            ];
          } else {
            return memo;
          }
        }, [])
      : [],
    onDeposit,
    onWithdraw,
  ];
};

export default useDeposit;
