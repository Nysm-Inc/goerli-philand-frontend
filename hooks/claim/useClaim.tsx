import { useContractWrite } from "wagmi";
import { PHI_CLAIM_CONTRACT_ADDRESS } from "~/constants";
import { PhiClaimAbi } from "~/abi";
import { getCoupon } from "~/utils/coupon";
import { conditionList } from "~/types/quest";

const useClaim = (address?: string) => {
  const { data, write } = useContractWrite(
    {
      addressOrName: PHI_CLAIM_CONTRACT_ADDRESS,
      contractInterface: PhiClaimAbi,
    },
    "claimPhiObject"
  );

  return async (contractAddress: string, tokenId: number) => {
    if (!address) return;

    const coupon = await getCoupon(address, tokenId);
    if (!coupon) return;

    const condition = conditionList[tokenId];
    const calldata = [contractAddress, tokenId, condition.name + condition.value.toString(), coupon];
    write({ args: calldata });
  };
};

export default useClaim;
