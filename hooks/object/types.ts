import { FreeObjectAbi, PhiObjectAbi, PremiumObjectAbi } from "~/abi";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  PHI_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
} from "~/constants";

export type ContractAddress =
  | typeof PHI_OBJECT_CONTRACT_ADDRESS
  | typeof FREE_OBJECT_CONTRACT_ADDRESS
  | typeof PREMIUM_OBJECT_CONTRACT_ADDRESS;

export const ContractAbis = {
  [PHI_OBJECT_CONTRACT_ADDRESS]: PhiObjectAbi,
  [FREE_OBJECT_CONTRACT_ADDRESS]: FreeObjectAbi,
  [PREMIUM_OBJECT_CONTRACT_ADDRESS]: PremiumObjectAbi,
};
