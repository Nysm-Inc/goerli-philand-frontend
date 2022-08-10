import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "~/contexts";
import { ClaimableList } from "~/types/quest";
import { getClaimableList, postClaimableList } from "~/utils/condition";

const useClaimableList = (address?: string): [ClaimableList, () => Promise<void>] => {
  const { blockNumber } = useContext(AppContext);
  const [claimableList, setClaimableList] = useState<ClaimableList>([]);

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
      setClaimableList(list);
    })();
  }, [address, blockNumber]);

  return [claimableList, updateClaimableList];
};

export default useClaimableList;
