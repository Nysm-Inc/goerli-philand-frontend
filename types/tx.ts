import { Chain } from "wagmi";
import { Context, Extra } from "~/utils/sentry";

export type Status = "idle" | "loading" | "success" | "error";

export type Tx = {
  action?: string;
  msg?: string;
  hash?: string;
  chain?: Chain;
  status: Status;
  tmpStatus: Status;
};

export const wrapTxErr = (error: Error, variables: any): { error: Error; extra: Extra; context: Context } => {
  const msg = variables.functionName + ": " + error.message;
  const e = new Error(msg, { cause: error });
  e.name = "Contract Write Error";
  return {
    error: e,
    extra: { contract: variables.addressOrName, function: variables.functionName, args: JSON.stringify(variables.args) },
    context: {
      key: variables.functionName,
      value: { contract: variables.addressOrName, function: variables.functionName, args: JSON.stringify(variables.args) },
    },
  };
};
