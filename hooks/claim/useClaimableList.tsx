import { useCallback, useEffect, useState } from "react";
import { ClaimableList } from "~/types/quest";
import { getClaimableList, postClaimableList } from "~/utils/condition";

const useClaimableList = (address?: string): [ClaimableList, () => Promise<void>] => {
  const [refetched, setRefetched] = useState(false);
  const [claimableList, setClaimableList] = useState<ClaimableList>([]);

  useEffect(() => {
    if (!address) return;

    (async () => {
      const list = await getClaimableList(address);
      setClaimableList(list);
    })();
  }, [address, refetched]);

  const refetchClaimableList = useCallback(async () => {
    if (!address) return;

    return postClaimableList(address).then(() => setRefetched((prev) => !prev));
  }, [address]);

  return [claimableList, refetchClaimableList];
};

export default useClaimableList;
