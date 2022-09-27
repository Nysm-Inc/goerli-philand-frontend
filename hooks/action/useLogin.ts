import { useEffect } from "react";
import { login } from "~/utils/action";

const useLogin = (address: string) => {
  useEffect(() => {
    login(address);
  }, [address]);
};

export default useLogin;
