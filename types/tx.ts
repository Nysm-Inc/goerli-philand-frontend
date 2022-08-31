import { Chain } from "wagmi";

export type Status = "idle" | "loading" | "success" | "error";

export type Tx = {
  action?: string;
  msg?: string;
  hash?: string;
  chain?: Chain;
  status: Status;
  tmpStatus: Status;
};

export const wrapTxErr = (error: Error, variables: any): Error => {
  const msg = JSON.stringify({ contract: variables.addressOrName, function: variables.functionName, args: variables.args });
  const e = new Error(msg, { cause: error });
  e.name = "Contract Write Error";
  return e;
};
