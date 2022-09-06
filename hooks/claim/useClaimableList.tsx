import { useCallback, useEffect, useState } from "react";
import { QuestClaimableList } from "~/types/quest";
import { getClaimableList, postClaimableList } from "~/utils/condition";

const useClaimableList = (address?: string, refresh?: boolean): [QuestClaimableList, () => Promise<void>] => {
  const [claimableList, setClaimableList] = useState<QuestClaimableList>({});

  const fetchClaimableList = useCallback(async () => {
    if (!address) return;

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
  }, [address]);

  const updateClaimableList = useCallback(async () => {
    if (!address) return;

    return postClaimableList(address);
  }, [address]);

  useEffect(() => {
    fetchClaimableList();
    updateClaimableList();
  }, [address]);

  useEffect(() => {
    fetchClaimableList();
  }, [refresh]);

  return [claimableList, updateClaimableList];
};

export default useClaimableList;
