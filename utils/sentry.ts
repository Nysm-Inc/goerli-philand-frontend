import { captureException } from "@sentry/nextjs";

export const captureError = (err: string) => {
  if (process.env.NEXT_PUBLIC_APP_ENV === "local") {
    console.error(err);
    captureException(err);
  } else {
    captureException(err);
  }
};
