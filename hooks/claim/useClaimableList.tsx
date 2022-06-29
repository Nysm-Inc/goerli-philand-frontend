import { useCallback, useEffect, useState } from "react";
import { ClaimableList } from "~/types/quest";
import { getClaimableList, postClaimableList } from "~/utils/condition";

const useClaimableList = (address?: string): [ClaimableList, () => Promise<void>, () => void] => {
  const [_refetch, setRefetch] = useState(false);
  const [claimableList, setClaimableList] = useState<ClaimableList>([]);
  const refetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    if (!address) return;

    (async () => {
      const list = await getClaimableList(address);
      setClaimableList(list);
    })();
  }, [address, _refetch]);

  const updateClaimableList = useCallback(async () => {
    if (!address) return;

    return postClaimableList(address);
  }, [address]);

  return [claimableList, updateClaimableList, refetch];
};

export default useClaimableList;
