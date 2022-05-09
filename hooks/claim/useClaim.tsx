import { useCallback } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { PHI_CLAIM_CONTRACT_ADDRESS } from "~/constants";
import { PhiClaimAbi } from "~/abi";
import { getCoupon } from "~/utils/coupon";
import { conditionList } from "~/types";

const useClaim = (address?: string, provider?: Web3Provider) => {
  return useCallback(
    async (tokenId: number) => {
      if (!address || !provider) return;
      const coupon = await getCoupon(address, tokenId);
      if (!coupon) return;

      const singer = provider.getSigner();
      const contract = new ethers.Contract(PHI_CLAIM_CONTRACT_ADDRESS, PhiClaimAbi, singer);

      const condition = conditionList[tokenId];
      const calldata = [tokenId, condition.name + condition.value.toString(), coupon];
      return await contract.claimObject(...calldata);
    },
    [address, provider]
  );
};

export default useClaim;
