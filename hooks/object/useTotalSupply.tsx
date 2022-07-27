import { useContractReads } from "wagmi";
import { QUEST_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { QuestObjectAbi } from "~/abi";
import { objectMetadataList } from "~/types/object";
import { ObjectContractAddress } from "~/types";

const totalSupply = (tokenId: number) => ({
  addressOrName: QUEST_OBJECT_CONTRACT_ADDRESS,
  contractInterface: QuestObjectAbi,
  functionName: "totalSupply",
  args: [tokenId],
});

const useTotalSupply = (contract: ObjectContractAddress): { [tokenId: number]: number } => {
  const { data } = useContractReads({
    contracts: Object.values(objectMetadataList[contract]).map((metadata) => totalSupply(metadata.tokenId)),
    watch: true,
    keepPreviousData: true,
  });

  return data && data[0] ? data.reduce((memo, num, i) => ({ ...memo, [i + 1]: num.toNumber() }), {}) : {};
};

export default useTotalSupply;
