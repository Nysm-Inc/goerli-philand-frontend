import { Chain } from "wagmi";
import { Extra } from "~/utils/sentry";

export type Status = "idle" | "loading" | "success" | "error";

export type Tx = {
  action?: string;
  msg?: string;
  hash?: string;
  chain?: Chain;
  status: Status;
  tmpStatus: Status;
};

export const sentryErr = (error: Error, variables: any): { error: Error; txName: string; extra: Extra } => {
  const e = new Error(error.message, { cause: error });
  e.name = "Contract Write Error";
  return {
    error: e,
    txName: variables.functionName,
    extra: {
      contract: variables.addressOrName,
      function: variables.functionName,
      args: JSON.stringify(variables.args),
      maxFeePerGas: variables.overrides?.maxFeePerGas?.toString(),
      maxPriorityFeePerGas: variables.overrides?.maxPriorityFeePerGas?.toString(),
    },
  };
};
