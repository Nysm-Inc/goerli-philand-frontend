import { useRouter } from "next/router";
import { useEffect } from "react";
import { pageview } from "~/utils/ga/ga";

const usePageview = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (path: string) => {
      pageview(path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};

export default usePageview;
