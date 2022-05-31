import { useCallback, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { PHI_MAP_CONTRACT_ADDRESS, PHI_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { PhiMapAbi } from "~/abi";
import { DepositObject } from "~/types";

const useDeposit = (
  ens: string | null | undefined,
  provider?: Web3Provider
): [
  DepositObject[],
  (
    args: {
      tokenId: number;
      amount: number;
    }[]
  ) => Promise<any>,
  (
    args: {
      tokenId: number;
      amount: number;
    }[]
  ) => Promise<any>
] => {
  const [depositObjects, setDepositObjects] = useState<DepositObject[]>([]);

  const deposit = useCallback(
    async (args: { tokenId: number; amount: number }[]) => {
      if (!ens || !provider) return;

      const singer = provider.getSigner();
      const contract = new ethers.Contract(PHI_MAP_CONTRACT_ADDRESS, PhiMapAbi, singer);

      const calldata = [
        ens.slice(0, -4),
        args.map(() => PHI_OBJECT_CONTRACT_ADDRESS),
        args.map((arg) => arg.tokenId),
        args.map((arg) => arg.amount),
      ];
      return await contract.batchDeposit(...calldata);
    },
    [ens, provider]
  );

  const undeposit = useCallback(
    async (args: { tokenId: number; amount: number }[]) => {
      if (!ens || !provider) return;

      const singer = provider.getSigner();
      const contract = new ethers.Contract(PHI_MAP_CONTRACT_ADDRESS, PhiMapAbi, singer);

      const calldata = [
        ens.slice(0, -4),
        args.map(() => PHI_OBJECT_CONTRACT_ADDRESS),
        args.map((arg) => arg.tokenId),
        args.map((arg) => arg.amount),
      ];
      return await contract.batchUnDeposit(...calldata);
    },
    [ens, provider]
  );

  useEffect(() => {
    if (!ens || !provider) return;

    (async () => {
      const singer = provider.getSigner();
      const contract = new ethers.Contract(PHI_MAP_CONTRACT_ADDRESS, PhiMapAbi, singer);

      const calldata = [ens.slice(0, -4)];
      const res = await contract.checkAllDepositStatus(...calldata);
      // @ts-ignore
      const parsed: DepositObject[] = res.map((object) => {
        return {
          contractAddress: object.contractAddress,
          tokenId: BigNumber.from(object.tokenId).toNumber(),
          timestamp: BigNumber.from(object.timestamp).toNumber(),
          amount: BigNumber.from(object.amount).toNumber(),
          used: BigNumber.from(object.used).toNumber(),
        };
      });
      setDepositObjects(parsed);
    })();
  }, [ens, provider]);

  return [depositObjects, deposit, undeposit];
};

export default useDeposit;
