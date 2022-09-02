import { captureException } from "@sentry/nextjs";
import axios, { AxiosError, AxiosResponse } from "axios";

export type Extra = { [key: string]: string };
export type Context = { key: string; value: { [key: string]: string } };

export const captureError = (err: Error, extra?: Extra, context?: Context) => {
  captureException(err, (scope) => {
    if (extra) {
      Object.keys(extra).forEach((key) => {
        scope.setExtra(key, extra[key]);
      });
    }
    if (context) {
      scope.setContext(context.key, context.value);
    }
    scope.setTransactionName(err.name);
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
