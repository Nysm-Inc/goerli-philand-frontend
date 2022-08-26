import * as Sentry from "@sentry/nextjs";
import { CaptureConsole } from "@sentry/integrations";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_APP_ENV,
  tracesSampleRate: 1.0,
  integrations: [new CaptureConsole({ levels: ["error"] })],
});
