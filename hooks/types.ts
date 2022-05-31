import { Web3Provider } from "@ethersproject/providers";

export type PhiHookArgs = {
  account: string | null | undefined;
  ens: string | null | undefined;
  provider?: Web3Provider;
  disabled?: boolean;
  // txCount?: number => can i use signer.getTransactionCount() ?
};
