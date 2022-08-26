import { setUser } from "@sentry/nextjs";
import { useEffect } from "react";

const useSentry = (address?: string) => {
  useEffect(() => {
    if (!address) return;

    setUser({ id: address });
  }, [address]);
};

export default useSentry;
