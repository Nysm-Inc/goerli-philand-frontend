import { MAP_CONTRACT_ADDRESS } from "~/constants";
import { PhiObjectAbi } from "~/abi";
import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { ContractAbis, ContractAddress } from "./types";
import { Tx } from "~/types/wagmi";

const useApproveAll = (
  contract: ContractAddress,
  account?: string,
  disabled?: boolean
): [boolean, { approve: () => void; tx: Tx }] => {
  const { data } = useContractRead(
    {
      addressOrName: contract,
      contractInterface: ContractAbis[contract],
    },
    "isApprovedForAll",
    {
      args: account ? [account, MAP_CONTRACT_ADDRESS] : null,
      watch: true,
      enabled: !!account && !disabled,
      onSuccess(data) {
        //
      },
    }
  );

  const {
    data: writeData,
    write,
    status: tmpStatus,
  } = useContractWrite(
    {
      addressOrName: contract,
      contractInterface: PhiObjectAbi,
    },
    "setApprovalForAll",
    {
      args: [MAP_CONTRACT_ADDRESS, 1],
    }
  );
  const { status } = useWaitForTransaction({ hash: writeData?.hash || "" });

  return [
    // @ts-ignore
    data,
    {
      approve: write,
      tx: {
        hash: writeData?.hash,
        tmpStatus,
        status,
      },
    },
  ];
};

export default useApproveAll;
