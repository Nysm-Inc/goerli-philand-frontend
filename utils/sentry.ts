import { captureException } from "@sentry/nextjs";
import axios, { AxiosError, AxiosResponse } from "axios";

export type Extra = { [key: string]: string };

export const captureError = (err: Error, txName?: string, extra?: Extra) => {
  captureException(err, (scope) => {
    if (txName) scope.setTransactionName(txName);
    if (extra) scope.setExtras(extra);
    return scope;
  });
};

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    captureError(error);
    return Promise.reject(error);
  }
);
