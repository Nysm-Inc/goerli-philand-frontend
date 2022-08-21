import { DepositObject } from "~/types";

export type LandObject = DepositObject & { select: number; writed: boolean };
