import { useContractRead, useContractWrite } from "wagmi";
import { BigNumber } from "ethers";
import { PHI_MAP_CONTRACT_ADDRESS, PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { PhiMapAbi } from "~/abi";
import { DepositObject } from "~/types";

const useDeposit = (
  ens?: string | null,
  disabled?: boolean
): [
  DepositObject[],
  (
    args: {
      tokenId: number;
      amount: number;
    }[]
  ) => void,
  (
    args: {
      tokenId: number;
      amount: number;
    }[]
  ) => void
] => {
  const { data, isLoading, isFetching } = useContractRead(
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

  const onDeposit = async (args: { tokenId: number; amount: number }[]) => {
    if (!ens) return;

    const calldata = [
      ens.slice(0, -4),
      args.map(() => PHI_OBJECT_CONTRACT_ADDRESS),
      args.map((arg) => arg.tokenId),
      args.map((arg) => arg.amount),
    ];
    return deposit({ args: calldata });
  };

  const onUndeposit = async (args: { tokenId: number; amount: number }[]) => {
    if (!ens) return;

    const calldata = [
      ens.slice(0, -4),
      args.map(() => PHI_OBJECT_CONTRACT_ADDRESS),
      args.map((arg) => arg.tokenId),
      args.map((arg) => arg.amount),
    ];
    return undeposit({ args: calldata });
  };

  return [
    data
      ? data.map((object) => {
          return {
            contractAddress: object[0],
            tokenId: BigNumber.from(object[1]).toNumber(),
            timestamp: BigNumber.from(object[4]).toNumber(),
            amount: BigNumber.from(object[2]).toNumber(),
            used: BigNumber.from(object[3]).toNumber(),
          };
        })
      : [],
    onDeposit,
    onUndeposit,
  ];
};

export default useDeposit;
