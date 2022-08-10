import { useCallback, useEffect, useState } from "react";
import { ClaimableList } from "~/types/quest";
import { getClaimableList, postClaimableList } from "~/utils/condition";

const useClaimableList = (address?: string): [ClaimableList, () => Promise<void>] => {
  const [claimableList, setClaimableList] = useState<ClaimableList>([]);
  const [refetch, setRefetch] = useState(false);

  const updateClaimableList = useCallback(async () => {
    if (!address) return;

    return postClaimableList(address).then(() => {
      setTimeout(() => setRefetch((prev) => !prev), 10000);
    });
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
  }, [address, refetch]);

  return [claimableList, updateClaimableList];
};

export default useClaimableList;
