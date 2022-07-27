import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { BigNumber } from "ethers";
import type { TransactionResponse } from "@ethersproject/providers";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { MapAbi } from "~/abi";
import { BalanceObject, DepositObject } from "~/types";
import { Tx } from "~/types/tx";

const useDeposit = (
  ens?: string | null,
  disabled?: boolean
): [
  DepositObject[],
  { deposit: (args: BalanceObject[]) => Promise<TransactionResponse | undefined>; tx: Tx },
  { withdraw: (args: BalanceObject[]) => Promise<TransactionResponse | undefined>; tx: Tx }
] => {
  const { data, isFetching } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "checkAllDepositStatus",
    args: ens ? [ens.slice(0, -4)] : null,
    watch: true,
    enabled: !!ens && !disabled,
  });
  const {
    data: depositData,
    writeAsync: deposit,
    status: depositTmpStatus,
  } = useContractWrite({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "batchDeposit",
  });
  const { status: depositStatus } = useWaitForTransaction({ hash: depositData?.hash || "" });

  const {
    data: withdrawData,
    writeAsync: withdraw,
    status: withdrawTmpStatus,
  } = useContractWrite({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "batchWithdraw",
  });
  const { status: withdrawStatus } = useWaitForTransaction({ hash: withdrawData?.hash || "" });

  const onDeposit = async (args: { contract: string; tokenId: number; amount: number }[]) => {
    if (!ens) return;

    const calldata = [ens.slice(0, -4), args.map((arg) => arg.contract), args.map((arg) => arg.tokenId), args.map((arg) => arg.amount)];
    return deposit({ args: calldata });
  };

  const onWithdraw = async (args: { contract: string; tokenId: number; amount: number }[]) => {
    if (!ens) return;

    const calldata = [ens.slice(0, -4), args.map((arg) => arg.contract), args.map((arg) => arg.tokenId), args.map((arg) => arg.amount)];
    return withdraw({ args: calldata });
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
    {
      deposit: onDeposit,
      tx: {
        hash: depositData?.hash,
        tmpStatus: depositTmpStatus,
        status: depositStatus,
        action: "Depositing Objects to Map contract of PHI",
      },
    },
    {
      withdraw: onWithdraw,
      tx: {
        hash: withdrawData?.hash,
        tmpStatus: withdrawTmpStatus,
        status: withdrawStatus,
        action: "Withdrawing Objects to Your Wallet",
      },
    },
  ];
};

export default useDeposit;
