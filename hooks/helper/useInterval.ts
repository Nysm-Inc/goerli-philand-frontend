import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, s: number) => {
  const callbackRef = useRef<() => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => callbackRef.current();
    const id = setInterval(tick, s);
    return () => clearInterval(id);
  }, []);
};

export default useInterval;
