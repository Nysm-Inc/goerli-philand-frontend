import { useContext, useEffect } from "react";
import { useDeprecatedContractWrite, useWaitForTransaction } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import axios from "axios";
import { REGISTRY_CONTRACT_ADDRESS, UTILS_API_GATEWAY } from "~/constants";
import RegistryAbi from "~/abi/registry.json";
import { Coupon } from "~/types/quest";
import { formatTxErr } from "~/types/tx";
import { AppContext } from "~/contexts";
import { getFastestGasWei } from "~/utils/gas";
import { captureError } from "~/utils/sentry";

const useCreatePhiland = (account?: string, ens?: string): { createPhiland: () => Promise<TransactionResponse | undefined> } => {
  const { addTx } = useContext(AppContext);
  const {
    data: writeData,
    writeAsync,
    status: tmpStatus,
  } = useDeprecatedContractWrite({
    addressOrName: REGISTRY_CONTRACT_ADDRESS,
    contractInterface: RegistryAbi,
    functionName: "createPhiland",
    onError: (error, variables) => captureError(formatTxErr(error, variables)),
  });
  const { status } = useWaitForTransaction({ hash: writeData?.hash || "" });

  useEffect(() => {
    addTx({
      hash: writeData?.hash,
      tmpStatus,
      status,
      action: "Creating a Land with Your ENS",
    });
  }, [tmpStatus, status]);

  return {
    createPhiland: async () => {
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

export default useCreatePhiland;
