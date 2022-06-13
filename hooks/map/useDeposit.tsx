import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { BigNumber } from "ethers";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { MapAbi } from "~/abi";
import { BalanceObject, DepositObject } from "~/types";
import { Tx } from "~/types/wagmi";

const useDeposit = (
  ens?: string | null,
  disabled?: boolean
): [
  DepositObject[],
  { deposit: (args: BalanceObject[]) => void; tx: Tx },
  { undeposit: (args: BalanceObject[]) => void; tx: Tx }
] => {
  const { data, isFetching } = useContractRead(
    {
      addressOrName: MAP_CONTRACT_ADDRESS,
      contractInterface: MapAbi,
    },
    "checkAllDepositStatus",
    {
      args: ens ? [ens.slice(0, -4)] : null,
      watch: true,
      enabled: !!ens && !disabled,
      onSuccess(data) {
        //
      },
    }
  );
  const {
    data: depositData,
    write: deposit,
    status: depositTmpStatus,
  } = useContractWrite(
    {
      addressOrName: MAP_CONTRACT_ADDRESS,
      contractInterface: MapAbi,
    },
    "batchDeposit"
  );
  const { status: depositStatus } = useWaitForTransaction({ hash: depositData?.hash || "" });

  const {
    data: undepositData,
    write: undeposit,
    status: undepositTmpStatus,
  } = useContractWrite(
    {
      addressOrName: MAP_CONTRACT_ADDRESS,
      contractInterface: MapAbi,
    },
    "batchUnDeposit"
  );
  const { status: undepositStatus } = useWaitForTransaction({ hash: undepositData?.hash || "" });

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

  const onUndeposit = async (args: { contract: string; tokenId: number; amount: number }[]) => {
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
    {
      deposit: onDeposit,
      tx: {
        hash: depositData?.hash,
        tmpStatus: depositTmpStatus,
        status: depositStatus,
      },
    },
    {
      undeposit: onUndeposit,
      tx: {
        hash: undepositData?.hash,
        tmpStatus: undepositTmpStatus,
        status: undepositStatus,
      },
    },
  ];
};

export default useDeposit;
