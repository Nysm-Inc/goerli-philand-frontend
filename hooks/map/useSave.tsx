import { useContractWrite } from "wagmi";
import { PHI_MAP_CONTRACT_ADDRESS } from "~/constants";
import { PhiMapAbi } from "~/abi";
import { WriteObject } from "~/types";

const useSave = (ens?: string | null) => {
  const { data, write } = useContractWrite(
    {
      addressOrName: PHI_MAP_CONTRACT_ADDRESS,
      contractInterface: PhiMapAbi,
    },
    "save"
  );

  return (
    removeArgs: { removeIdxs: (string | number)[]; remove_check: boolean },
    writeArgs: WriteObject[],
    linkArgs: { title: string; url: string }[]
  ) => {
    if (!ens) return;

    const calldata = [ens.slice(0, -4), removeArgs.removeIdxs, removeArgs.remove_check, writeArgs, linkArgs];
    return write({ args: calldata });
  };
};

export default useSave;
