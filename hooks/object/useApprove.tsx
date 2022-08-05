import { useContext, useEffect } from "react";
import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { QuestObjectAbi } from "~/abi";
import { ContractAbis, ObjectContractAddress, WallpaperContractAddress } from "~/types";
import { AppContext } from "~/contexts";

const useApprove = (
  contract: ObjectContractAddress | WallpaperContractAddress,
  account?: string,
  disabled?: boolean
): [boolean, { approve: () => Promise<TransactionResponse | undefined> }] => {
  const { addTx } = useContext(AppContext);
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

  useEffect(() => {
    addTx({
      hash: writeData?.hash,
      tmpStatus,
      status,
      action: "Approving Object Transfer Permission",
    });
  }, [tmpStatus, status]);

  return [
    // @ts-ignore
    data,
    {
      approve: () => {
        return writeAsync({
          args: [MAP_CONTRACT_ADDRESS, 1],
        });
      },
    },
  ];
};

export default useApprove;
