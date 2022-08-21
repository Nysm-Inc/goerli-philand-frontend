import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DepositObject, ObjectContractAddress } from "~/types";
import { FREE_OBJECT_CONTRACT_ADDRESS, PREMIUM_OBJECT_CONTRACT_ADDRESS, QUEST_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { LandObject } from "./types";

// todo
const priority: { [contract in ObjectContractAddress]: number } = {
  [QUEST_OBJECT_CONTRACT_ADDRESS]: 1,
  [FREE_OBJECT_CONTRACT_ADDRESS]: 1 * 1000,
  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: 1000 * 1000,
};

const sort = (objects: LandObject[]): LandObject[] => {
  return [...objects].sort((a, b) => priority[a.contractAddress] * a.tokenId - priority[b.contractAddress] * b.tokenId);
};

export const useLand = (
  originObjects: DepositObject[],
  isEdit: boolean
): [
  LandObject[],
  (idx: number) => void,
  (idx: number) => void,
  Dispatch<SetStateAction<LandObject[]>>,
  (contract: ObjectContractAddress, tokenId: number) => void,
  (contract: ObjectContractAddress, tokenId: number) => void,
  () => void
] => {
  const [objects, setObjects] = useState<LandObject[]>([]);

  const plus = (idx: number) => {
    const copied = [...objects];
    copied[idx].select += 1;
    setObjects(copied);
  };
  const minus = (idx: number) => {
    const copied = [...objects];
    copied[idx].select -= 1;
    setObjects(copied);
  };
  const tryWrite = (contract: ObjectContractAddress, tokenId: number) => {
    setObjects((prev) => {
      const copied = [...prev];
      const idx = copied.findIndex((c) => c.contractAddress === contract && c.tokenId === tokenId);
      copied[idx].used += 1;
      if (copied[idx].amount - copied[idx].used > 0) {
        return copied;
      } else {
        return copied.filter((_, i) => i !== idx);
      }
    });
  };

  const tryRemove = (contract: ObjectContractAddress, tokenId: number) => {
    let copied = [...objects];
    const idx = copied.findIndex((c) => c.contractAddress === contract && c.tokenId === tokenId);
    if (idx < 0) {
      copied = [
        ...copied,
        {
          contractAddress: contract,
          tokenId: tokenId,
          amount: 1,
          used: 0,
          select: 0,
          writed: true,
        },
      ];
    } else {
      copied[idx].used -= 1;
    }
    setObjects(sort(copied));
  };
  const reset = () => {
    setObjects(sort(originObjects.map((object) => ({ ...object, select: 0, writed: false }))));
  };

  useEffect(() => {
    reset();
  }, [originObjects.length, isEdit]);

  return [objects, plus, minus, setObjects, tryWrite, tryRemove, reset];
};
