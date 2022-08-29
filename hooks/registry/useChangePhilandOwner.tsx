import { useContext, useEffect } from "react";
import axios from "axios";
import { useDeprecatedContractWrite, useWaitForTransaction } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import { REGISTRY_CONTRACT_ADDRESS, UTILS_API_GATEWAY } from "~/constants";
import RegistryAbi from "~/abi/registry.json";
import { Coupon } from "~/types/quest";
import { AppContext } from "~/contexts";
import { getFastestGasWei } from "~/utils/gas";

const useChangePhilandOwner = (account?: string, ens?: string): { changePhilandOwner: () => Promise<TransactionResponse | undefined> } => {
  const { addTx } = useContext(AppContext);
  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useDeprecatedContractWrite({
    addressOrName: REGISTRY_CONTRACT_ADDRESS,
    contractInterface: RegistryAbi,
    functionName: "changePhilandOwner",
    onError: (err) => console.error(err),
  });
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  useEffect(() => {
    addTx({
      hash: data?.hash,
      tmpStatus,
      status,
      action: "Changing an owner of your Land",
    });
  }, [tmpStatus, status]);

  return {
    changePhilandOwner: async () => {
      if (!account || !ens) return;

      const url = new URL(UTILS_API_GATEWAY + "/ens");
      url.searchParams.append("address", account);
      url.searchParams.append("name", ens.slice(0, -4));
      const res = await axios.get<{ coupon: Coupon }>(url.toString());

      const overrides = await getFastestGasWei();
      return writeAsync({ args: [ens.slice(0, -4), res.data.coupon], overrides });
    },
  };
};

export default useChangePhilandOwner;
