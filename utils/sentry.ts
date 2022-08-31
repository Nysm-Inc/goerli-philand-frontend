import { captureException } from "@sentry/nextjs";

export const captureError = (err: Error) => {
  if (process.env.NEXT_PUBLIC_APP_ENV === "local") {
    console.error(err);
  }

  captureException(err, (scope) => {
    scope.setTransactionName(err.name);
    return scope;
  });
};
