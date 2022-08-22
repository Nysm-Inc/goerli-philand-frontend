import { useMemo } from "react";
import { useContractReads } from "wagmi";
import { QUEST_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import QuestObjectAbi from "~/abi/questobject.json";
import { objectMetadataList } from "~/types/object";
import { ObjectContractAddress } from "~/types";

const totalSupply = (tokenId: number) => ({
  addressOrName: QUEST_OBJECT_CONTRACT_ADDRESS,
  contractInterface: QuestObjectAbi,
  functionName: "totalSupply",
  args: [tokenId],
});

const useTotalSupply = (contract: ObjectContractAddress, watch?: boolean): { [tokenId: number]: number } => {
  const metadata = useMemo(() => Object.values(objectMetadataList[contract]), [contract]);
  const { data } = useContractReads({
    contracts: metadata.map((meta) => totalSupply(meta.tokenId)),
    keepPreviousData: true,
    watch: !!watch,
  });

  return data && data[0] ? metadata.reduce((memo, meta, i) => ({ ...memo, [meta.tokenId]: data[i].toNumber() }), {}) : {};
};

export default useTotalSupply;
