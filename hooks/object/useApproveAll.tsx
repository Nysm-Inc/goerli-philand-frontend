import { PHI_MAP_CONTRACT_ADDRESS, PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { PhiObjectAbi } from "~/abi";
import { useContractRead, useContractWrite } from "wagmi";

const useApproveAll = (account?: string, disabled?: boolean): [boolean, () => void] => {
  const { data, isFetching } = useContractRead(
    {
      addressOrName: PHI_OBJECT_CONTRACT_ADDRESS,
      contractInterface: PhiObjectAbi,
    },
    "isApprovedForAll",
    {
      args: account ? [account, PHI_MAP_CONTRACT_ADDRESS] : [],
      watch: true,
      enabled: !disabled,
      onSuccess(data) {
        //
      },
    }
  );

  const { write } = useContractWrite(
    {
      addressOrName: PHI_OBJECT_CONTRACT_ADDRESS,
      contractInterface: PhiObjectAbi,
    },
    "setApprovalForAll",
    {
      args: [PHI_MAP_CONTRACT_ADDRESS, 1],
    }
  );

  // @ts-ignore
  return [data, write];
};

export default useApproveAll;
