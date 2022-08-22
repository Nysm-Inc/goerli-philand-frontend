import { useCallback, useEffect, useState } from "react";
import { useBlockNumber } from "wagmi";
import { QuestClaimableList } from "~/types/quest";
import { getClaimableList, postClaimableList } from "~/utils/condition";

const useClaimableList = (address?: string, watch?: boolean): [QuestClaimableList, () => Promise<void>] => {
  const { data: blockNumber } = useBlockNumber({ watch: !!watch });
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
    if (!address) return;

    fetchClaimableList();
    updateClaimableList();
  }, [address]);

  useEffect(() => {
    if (!watch) return;

    fetchClaimableList();
  }, [blockNumber]);

  return [claimableList, updateClaimableList];
};

export default useClaimableList;
