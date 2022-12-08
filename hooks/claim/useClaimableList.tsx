import { useCallback, useEffect, useState } from "react";
import { QuestClaimableList } from "~/types/quest";
import { getClaimableList, postClaimableList } from "~/utils/condition";
import useBlockNumber from "~/hooks/helper/useBlockNumber";

const useClaimableList = (address?: string, refresh?: boolean, watch?: boolean): [QuestClaimableList, () => Promise<void>] => {
  const blockNumber = useBlockNumber();
  const [claimableList, setClaimableList] = useState<QuestClaimableList>({});

  const fetchClaimableList = useCallback(async () => {
    if (!address) return;

    const list = await getClaimableList(address);
    setClaimableList(list);
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
    if (refresh) fetchClaimableList();
  }, [refresh]);

  useEffect(() => {
    if (watch) fetchClaimableList();
  }, [blockNumber]);

  return [claimableList, updateClaimableList];
};

export default useClaimableList;
