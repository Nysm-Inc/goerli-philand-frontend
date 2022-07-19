export type Status = "idle" | "loading" | "success" | "error";

export type Tx = {
  action?: string;
  msg?: string;

  hash?: string;
  status: Status;
  tmpStatus: Status;
};
