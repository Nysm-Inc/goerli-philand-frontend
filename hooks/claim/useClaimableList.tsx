import { useCallback, useEffect, useState } from "react";
import { useBlockNumber } from "wagmi";
import { QuestClaimableList } from "~/types/quest";
import { getClaimableList, postClaimableList } from "~/utils/condition";

const useClaimableList = (address?: string): [QuestClaimableList, () => Promise<void>] => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const [claimableList, setClaimableList] = useState<QuestClaimableList>([]);

  const updateClaimableList = useCallback(async () => {
    if (!address) return;

    return postClaimableList(address);
  }, [address]);

  useEffect(() => {
    if (!address) return;

    updateClaimableList();
  }, [address]);

  useEffect(() => {
    if (!address) return;

    (async () => {
      const list = await getClaimableList(address);
      setClaimableList(
        list.reduce(
          (memo, progress) => ({
            ...memo,
            [progress.TokenId]: {
              tokenId: progress.TokenId,
              condition: progress.Condition,
              value: progress.Value,
              timeStamp: progress.TimeStamp,
            },
          }),
          {}
        )
      );
    })();
  }, [address, blockNumber]);

  return [claimableList, updateClaimableList];
};

export default useClaimableList;
