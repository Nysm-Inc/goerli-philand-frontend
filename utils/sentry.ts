import { captureException } from "@sentry/nextjs";
import axios, { AxiosError, AxiosResponse } from "axios";

export type Extra = { [key: string]: string };

export const captureError = (err: Error, extra?: Extra) => {
  captureException(err, (scope) => {
    if (extra) scope.setExtras(extra);
    scope.setTransactionName(err.message);
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
