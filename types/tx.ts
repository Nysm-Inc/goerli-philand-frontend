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

export const wrapTxErr = (error: Error, variables: any): Error => ({
  name: "Contract Write Error",
  message: JSON.stringify({ contract: variables.addressOrName, function: variables.functionName, args: variables.args }),
  cause: error,
});
