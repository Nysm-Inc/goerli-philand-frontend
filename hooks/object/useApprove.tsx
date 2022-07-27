import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { TransactionResponse } from "@ethersproject/providers";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { QuestObjectAbi } from "~/abi";
import { Tx } from "~/types/tx";
import { ContractAbis, ObjectContractAddress, WallpaperContractAddress } from "~/types";

const useApprove = (
  contract: ObjectContractAddress | WallpaperContractAddress,
  account?: string,
  disabled?: boolean
): [boolean, { approve: () => Promise<TransactionResponse | undefined>; tx: Tx }] => {
  const { data } = useContractRead({
    addressOrName: contract,
    contractInterface: ContractAbis[contract],
    functionName: "isApprovedForAll",
    args: account ? [account, MAP_CONTRACT_ADDRESS] : null,
    watch: true,
    enabled: !!account && !disabled,
  });

  const {
    data: writeData,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: contract,
    contractInterface: QuestObjectAbi,
    functionName: "setApprovalForAll",
  });
  const { status } = useWaitForTransaction({ hash: writeData?.hash || "" });

  return [
    // @ts-ignore
    data,
    {
      approve: () => {
        return writeAsync({
          args: [MAP_CONTRACT_ADDRESS, 1],
        });
      },
      tx: {
        hash: writeData?.hash,
        tmpStatus,
        status,
        action: "Approving Object Transfer Permission",
      },
    },
  ];
};

export default useApprove;
