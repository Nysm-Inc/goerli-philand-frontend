import { useEffect, useState } from "react";
import { useBlockNumber } from "wagmi";
import { QuestProgressList } from "~/types/quest";
import { getProgressList } from "~/utils/condition";

const useQuestProgress = (address?: string): QuestProgressList => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const [progressList, setProgressList] = useState<QuestProgressList>({});

  useEffect(() => {
    if (!address) return;

    (async () => {
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
    })();
  }, [address, blockNumber]);

  return progressList;
};

export default useQuestProgress;