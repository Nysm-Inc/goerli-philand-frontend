import { useContractWrite, useWaitForTransaction } from "wagmi";
import { TransactionResponse } from "@ethersproject/providers";
import { CLAIM_CONTRACT_ADDRESS, PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { ClaimAbi } from "~/abi";
import { getCoupon } from "~/utils/coupon";
import { conditionList } from "~/types/quest";
import { Tx } from "~/types/wagmi";

const useClaim = (address?: string): { claimPhi: (tokenId: number) => Promise<TransactionResponse | undefined>; tx: Tx } => {
  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite(
    {
      addressOrName: CLAIM_CONTRACT_ADDRESS,
      contractInterface: ClaimAbi,
    },
    "claimPhiObject"
  );
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  return {
    claimPhi: async (tokenId: number) => {
      if (!address) return;

      const coupon = await getCoupon(address, tokenId);
      if (!coupon) return;

      const condition = conditionList[tokenId];
      const calldata = [PHI_OBJECT_CONTRACT_ADDRESS, tokenId, condition.name + condition.value.toString(), coupon];
      return writeAsync({ args: calldata });
    },
    tx: {
      hash: data?.hash,
      tmpStatus,
      status,
    },
  };
};

export default useClaim;
