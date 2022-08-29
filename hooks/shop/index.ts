import { useContext, useEffect } from "react";
import { useDeprecatedContractWrite, useWaitForTransaction } from "wagmi";
import { BigNumber, utils } from "ethers";
import type { TransactionResponse } from "@ethersproject/providers";
import { PREMIUM_OBJECT_CONTRACT_ADDRESS, SHOP_CONTRACT_ADDRESS, WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import ShopAbi from "~/abi/shop.json";
import { objectMetadataList } from "~/types/object";
import { AppContext } from "~/contexts";
import { getFastestGasWei } from "~/utils/gas";

const useBuyObjects = (
  address?: string
): {
  buyObjects: (fTokenIds: number[], pTokenIds: number[], wTokenIds: number[]) => Promise<TransactionResponse | undefined>;
} => {
  const { addTx } = useContext(AppContext);
  const {
    data,
    writeAsync,
    status: tmpStatus,
  } = useDeprecatedContractWrite({
    addressOrName: SHOP_CONTRACT_ADDRESS,
    contractInterface: ShopAbi,
    functionName: "shopBuyObject",
    onError: console.error,
  });
  const { status } = useWaitForTransaction({ hash: data?.hash || "" });

  useEffect(() => {
    addTx({
      hash: data?.hash,
      tmpStatus,
      status,
      action: "Purchasing Objects",
    });
  }, [tmpStatus, status]);

  return {
    buyObjects: async (fTokenIds: number[], pTokenIds: number[], wTokenIds: number[]) => {
      const calldata = [address, fTokenIds, pTokenIds, wTokenIds];
      const overrides = await getFastestGasWei();
      const pValue = pTokenIds.reduce((sum, tokenId) => {
        const metadata = objectMetadataList[PREMIUM_OBJECT_CONTRACT_ADDRESS][tokenId];
        const wei = utils.parseEther(metadata.price.toString());
        return sum.add(wei);
      }, BigNumber.from(0));
      const wValue = wTokenIds.reduce((sum, tokenId) => {
        const metadata = objectMetadataList[WALLPAPER_CONTRACT_ADDRESS][tokenId];
        const wei = utils.parseEther(metadata.price.toString());
        return sum.add(wei);
      }, BigNumber.from(0));

      return writeAsync({
        args: calldata,
        overrides: { ...overrides, value: pValue.add(wValue).toString() },
      });
    },
  };
};

export default useBuyObjects;
