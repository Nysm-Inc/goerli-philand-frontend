import { useContext, useEffect } from "react";
import { useContractReads, useDeprecatedContractWrite, useWaitForTransaction } from "wagmi";
import type { TransactionResponse } from "@ethersproject/providers";
import ClaimAbi from "~/abi/claim.json";
import { CLAIM_CONTRACT_ADDRESS, QUEST_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { AppContext } from "~/contexts";
import { sentryErr } from "~/types/tx";
import { conditionList } from "~/types/quest";
import { objectMetadataList } from "~/types/object";
import { getCoupon } from "~/utils/coupon";
import { getFastestGasWei } from "~/utils/gas";
import { captureError } from "~/utils/sentry";

const checkClaimedStatus = (sender: string, tokenId: number) => ({
  addressOrName: CLAIM_CONTRACT_ADDRESS,
  contractInterface: ClaimAbi,
  functionName: "checkClaimedStatus",
  args: [sender, QUEST_OBJECT_CONTRACT_ADDRESS, tokenId],
});

const metadata = Object.values(objectMetadataList[QUEST_OBJECT_CONTRACT_ADDRESS]);

const useClaim = (
  address?: string,
  refresh?: boolean
): {
  claimedList: { [tokenId: number]: boolean };
  claimPhi: (tokenId: number) => Promise<TransactionResponse | undefined>;
  refetch: () => void;
} => {
  const { addTx } = useContext(AppContext);
  const { data, refetch } = useContractReads({
    contracts: metadata.map((meta) => checkClaimedStatus(address || "", meta.tokenId)),
    keepPreviousData: true,
  });

  const {
    data: writeData,
    writeAsync,
    status: tmpStatus,
  } = useDeprecatedContractWrite({
    addressOrName: CLAIM_CONTRACT_ADDRESS,
    contractInterface: ClaimAbi,
    functionName: "claimQuestObject",
    onError: (error, variables) => {
      const err = sentryErr(error, variables);
      captureError(err.error, err.txName, err.extra);
    },
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

  useEffect(() => {
    refetch();
  }, [refresh]);

  return {
    claimedList: data && data[0] ? metadata.reduce((memo, meta, i) => ({ ...memo, [meta.tokenId]: !!data[i].toNumber() }), {}) : {},
    claimPhi: async (tokenId: number) => {
      if (!address) return;

      const coupon = await getCoupon(address, tokenId);
      if (!coupon) return;

      const condition = conditionList[tokenId];
      const calldata = [QUEST_OBJECT_CONTRACT_ADDRESS, tokenId, condition.name + condition.value.toString(), coupon];
      const overrides = await getFastestGasWei();
      return writeAsync({ args: calldata, overrides });
    },
    refetch,
  };
};

export default useClaim;
