import { useCallback, useEffect, useState } from "react";
import { QuestProgressList } from "~/types/quest";
import { getProgressList } from "~/utils/condition";

const useQuestProgress = (address?: string, refresh?: boolean): QuestProgressList => {
  const [progressList, setProgressList] = useState<QuestProgressList>({});

  const fetchProgressList = useCallback(async () => {
    if (!address) return;

    const list = await getProgressList(address);
    setProgressList(
      list.reduce(
        (memo, progress) => ({
          ...memo,
          [progress.TokenId]: {
            tokenId: progress.TokenId,
            condition: progress.Condition,
            value: progress.Value,
            counter: progress.Counter,
          },
        }),
        {}
      )
    );
  }, [address]);

  useEffect(() => {
    fetchProgressList();
  }, [address, refresh]);

  return progressList;
};

export default useQuestProgress;
