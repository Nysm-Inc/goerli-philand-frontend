import { captureException } from "@sentry/nextjs";
import axios, { AxiosError, AxiosResponse } from "axios";

export const captureError = (err: Error) => {
  captureException(err, (scope) => {
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
