import { useContractReads, useContractWrite, useWaitForTransaction } from "wagmi";
import { TransactionResponse } from "@ethersproject/providers";
import { CLAIM_CONTRACT_ADDRESS, QUEST_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { ClaimAbi } from "~/abi";
import { getCoupon } from "~/utils/coupon";
import { conditionList } from "~/types/quest";
import { Tx } from "~/types/tx";
import { objectMetadataList } from "~/types/object";

const checkClaimedStatus = (tokenId: number) => ({
  addressOrName: CLAIM_CONTRACT_ADDRESS,
  contractInterface: ClaimAbi,
  functionName: "checkClaimedStatus",
  args: [QUEST_OBJECT_CONTRACT_ADDRESS, tokenId],
});

const useClaim = (
  address?: string,
  disabled?: boolean
): [boolean[], { claimPhi: (tokenId: number) => Promise<TransactionResponse | undefined>; tx: Tx }] => {
  const { data } = useContractReads({
    contracts: Object.values(objectMetadataList[QUEST_OBJECT_CONTRACT_ADDRESS]).map((metadata) => checkClaimedStatus(metadata.tokenId)),
    watch: true,
    enabled: !!address && !disabled,
  });

  const {
    data: writeData,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: CLAIM_CONTRACT_ADDRESS,
    contractInterface: ClaimAbi,
    functionName: "claimPhiObject",
  });
  const { status } = useWaitForTransaction({ hash: writeData?.hash || "" });

  return [
    // @ts-ignore
    data || [],
    {
      claimPhi: async (tokenId: number) => {
        if (!address) return;

        const coupon = await getCoupon(address, tokenId);
        if (!coupon) return;

        const condition = conditionList[tokenId];
        const calldata = [QUEST_OBJECT_CONTRACT_ADDRESS, tokenId, condition.name + condition.value.toString(), coupon];
        return writeAsync({ args: calldata });
      },
      tx: {
        hash: writeData?.hash,
        tmpStatus,
        status,
        action: "claim quest object",
      },
    },
  ];
};

export default useClaim;
