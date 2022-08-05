import { useContext, useEffect } from "react";
import { useContractReads, useContractWrite, useWaitForTransaction } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import { CLAIM_CONTRACT_ADDRESS, QUEST_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { ClaimAbi } from "~/abi";
import { getCoupon } from "~/utils/coupon";
import { conditionList } from "~/types/quest";
import { objectMetadataList } from "~/types/object";
import { AppContext } from "~/contexts";

const checkClaimedStatus = (sender: string, tokenId: number) => ({
  addressOrName: CLAIM_CONTRACT_ADDRESS,
  contractInterface: ClaimAbi,
  functionName: "checkClaimedStatus",
  args: [sender, QUEST_OBJECT_CONTRACT_ADDRESS, tokenId],
});

const metadata = Object.values(objectMetadataList[QUEST_OBJECT_CONTRACT_ADDRESS]);

const useClaim = (
  address?: string,
  disabled?: boolean
): [{ [tokenId: number]: boolean }, { claimPhi: (tokenId: number) => Promise<TransactionResponse | undefined> }] => {
  const { addTx } = useContext(AppContext);
  const { data } = useContractReads({
    contracts: metadata.map((meta) => checkClaimedStatus(address || "", meta.tokenId)),
    watch: true,
    enabled: !!address && !disabled,
    keepPreviousData: true,
  });

  const {
    data: writeData,
    writeAsync,
    status: tmpStatus,
  } = useContractWrite({
    addressOrName: CLAIM_CONTRACT_ADDRESS,
    contractInterface: ClaimAbi,
    functionName: "claimQuestObject",
  });
  const { status } = useWaitForTransaction({ hash: writeData?.hash || "" });

  useEffect(() => {
    addTx({
      hash: writeData?.hash,
      tmpStatus,
      status,
      action: "Claiming Quest Object",
    });
  }, [tmpStatus, status]);

  return [
    data && data[0] ? metadata.reduce((memo, meta, i) => ({ ...memo, [meta.tokenId]: !!data[i].toNumber() }), {}) : {},
    {
      claimPhi: async (tokenId: number) => {
        if (!address) return;

        const coupon = await getCoupon(address, tokenId);
        if (!coupon) return;

        const condition = conditionList[tokenId];
        const calldata = [QUEST_OBJECT_CONTRACT_ADDRESS, tokenId, condition.name + condition.value.toString(), coupon];
        return writeAsync({ args: calldata });
      },
    },
  ];
};

export default useClaim;
