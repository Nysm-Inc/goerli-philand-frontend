import { PHI_MAP_CONTRACT_ADDRESS, PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { PhiObjectAbi } from "~/abi";
import { useContractWrite } from "wagmi";

const useApproveAll = () => {
  const { data, write } = useContractWrite(
    {
      addressOrName: PHI_OBJECT_CONTRACT_ADDRESS,
      contractInterface: PhiObjectAbi,
    },
    "setApprovalForAll",
    {
      args: [PHI_MAP_CONTRACT_ADDRESS, 1],
    }
  );
  return write;
};

export default useApproveAll;
