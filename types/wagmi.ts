export type Status = "idle" | "loading" | "success" | "error";

export type Tx = {
  hash?: string;
  status: Status;
  tmpStatus: Status;
  msg?: string;
};
