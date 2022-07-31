import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { TransactionResponse } from "@ethersproject/providers";
import axios from "axios";
import { MAP_CONTRACT_ADDRESS, REGISTRY_CONTRACT_ADDRESS, UTILS_API_GATEWAY } from "~/constants";
import { MapAbi, RegistryAbi } from "~/abi";
import { nullAddress } from "~/types";
import { Tx } from "~/types/tx";
import { Coupon } from "~/types/quest";

const useCreatePhiland = (
  account?: string,
  ens?: string,
  disabled?: boolean
): [{ isCreated: boolean; isFetched: boolean }, { createPhiland: () => Promise<TransactionResponse | undefined>; tx: Tx }] => {
  const { data, isFetched } = useContractRead({
    addressOrName: MAP_CONTRACT_ADDRESS,
    contractInterface: MapAbi,
    functionName: "ownerOfPhiland",
    args: ens ? [ens.slice(0, -4)] : null,
    watch: true,
    enabled: !!ens && !disabled,
  });

  const {
    data: writeData,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: REGISTRY_CONTRACT_ADDRESS,
    contractInterface: RegistryAbi,
    functionName: "createPhiland",
  });
  const { status } = useWaitForTransaction({ hash: writeData?.hash || "" });

  return [
    // @ts-ignore
    { isCreated: data && data !== nullAddress, isFetched },
    {
      createPhiland: async () => {
        if (!account || !ens) return;

        const url = new URL(UTILS_API_GATEWAY + "/ens");
        url.searchParams.append("address", account);
        url.searchParams.append("name", ens.slice(0, -4));
        const res = await axios.get<{ coupon: Coupon }>(url.toString());

        return writeAsync({ args: [ens.slice(0, -4), res.data.coupon] });
      },
      tx: {
        hash: writeData?.hash,
        tmpStatus,
        status,
        action: "Creating a Land with Your ENS",
      },
    },
  ];
};

export default useCreatePhiland;
