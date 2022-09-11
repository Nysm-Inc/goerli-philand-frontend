import { providers } from "ethers";
import { FRONTEND_URL } from "~/constants";
import { postAccess } from "./access";
import { isValid } from "./ens";
import { event } from "./ga/ga";

export const isValidURL = (url: string) => {
  try {
    return Boolean(new URL(url));
  } catch (e) {
    return false;
  }
};

export const jump = async (url: string, f: (path: string) => void) => {
  try {
    const target = new URL(url);
    const landENS = new URL(window.location.href).pathname.slice(1);
    if (isValid(landENS)) {
      let address = "";
      if (window.ethereum) {
        try {
          // @ts-ignore
          const provider = new providers.Web3Provider(window.ethereum);
          address = await provider?.getSigner()?.getAddress();
        } catch {}
      }
      event({ action: "click", category: "jump_link", label: "object", value: target.toString() });
      postAccess(landENS, target.toString(), address);
    }

    if (target.host === new URL(FRONTEND_URL).host && isValid(target.pathname.slice(1))) {
      f(target.toString());
    } else {
      window.open(target, "_blank");
    }
  } catch {}
};
