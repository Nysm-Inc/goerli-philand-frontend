import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";
import { PhiObjectAbi } from "~/abi";
import { PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { phiObjectMetadataList } from "~/types/object";
import { Balance } from "~/types";

const useBalances = (account: string | null | undefined, provider?: Web3Provider): Balance[] => {
  const [balances, setBalances] = useState<Balance[]>([]);

  useEffect(() => {
    if (!account || !provider) return;

    (async () => {
      const singer = provider.getSigner();
      const contract = new ethers.Contract(PHI_OBJECT_CONTRACT_ADDRESS, PhiObjectAbi, singer);

      const calldata = [
        Object.keys(phiObjectMetadataList[PHI_OBJECT_CONTRACT_ADDRESS]).map(() => account),
        Object.keys(phiObjectMetadataList[PHI_OBJECT_CONTRACT_ADDRESS]).map((tokenId) => tokenId),
      ];
      const res = await contract.balanceOfBatch(...calldata);
      setBalances(
        // @ts-ignore
        res.map((balance, i) => {
          return {
            contract: PHI_OBJECT_CONTRACT_ADDRESS,
            tokenId: i + 1,
            amount: BigNumber.from(balance).toNumber(),
          };
        })
      );
    })();
  }, [account, provider]);

  return balances;
};

export default useBalances;
