import axios from "axios";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { TransactionResponse } from "@ethersproject/providers";
import { REGISTRY_CONTRACT_ADDRESS, UTILS_API_GATEWAY } from "~/constants";
import { RegistryAbi } from "~/abi";
import { Tx } from "~/types/tx";
import { Coupon } from "~/types/quest";

const useChangePhilandOwner = (
  account?: string,
  ens?: string
): { changePhilandOwner: () => Promise<TransactionResponse | undefined>; tx: Tx } => {
  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: REGISTRY_CONTRACT_ADDRESS,
    contractInterface: RegistryAbi,
    functionName: "changePhilandOwner",
  });
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  return {
    changePhilandOwner: async () => {
      if (!account || !ens) return;

      const url = new URL(UTILS_API_GATEWAY + "/ens");
      url.searchParams.append("address", account);
      url.searchParams.append("name", ens.slice(0, -4));
      const res = await axios.get<{ coupon: Coupon }>(url.toString());

      return writeAsync({ args: [ens.slice(0, -4), res.data.coupon] });
    },
    tx: {
      hash: data?.hash,
      tmpStatus,
      status,
      action: "Changing an owner of your Land",
    },
  };
};

export default useChangePhilandOwner;
