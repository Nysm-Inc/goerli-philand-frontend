import { useCallback, useEffect, useState } from "react";
import { useBlockNumber } from "wagmi";
import { ClaimableList } from "~/types/quest";
import { getClaimableList, postClaimableList } from "~/utils/condition";

const useClaimableList = (address?: string): [ClaimableList, () => Promise<void>] => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
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
