import { useContext, useEffect, useMemo } from "react";
import { useContractReads } from "wagmi";
import { QUEST_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { QuestObjectAbi } from "~/abi";
import { objectMetadataList } from "~/types/object";
import { ObjectContractAddress } from "~/types";
import { AppContext } from "~/contexts";

const totalSupply = (tokenId: number) => ({
  addressOrName: QUEST_OBJECT_CONTRACT_ADDRESS,
  contractInterface: QuestObjectAbi,
  functionName: "totalSupply",
  args: [tokenId],
});

const useTotalSupply = (contract: ObjectContractAddress): { [tokenId: number]: number } => {
  const { blockNumber } = useContext(AppContext);
  const metadata = useMemo(() => Object.values(objectMetadataList[contract]), [contract]);
  const { data, refetch } = useContractReads({
    contracts: metadata.map((meta) => totalSupply(meta.tokenId)),
    keepPreviousData: true,
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  return data && data[0] ? metadata.reduce((memo, meta, i) => ({ ...memo, [meta.tokenId]: data[i].toNumber() }), {}) : {};
};

export default useTotalSupply;
