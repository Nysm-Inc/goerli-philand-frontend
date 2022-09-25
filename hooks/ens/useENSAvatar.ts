import { useEffect, useState } from "react";
import { goerliProvider } from "~/connectors";

const useENSAvatar = (addressOrName?: string) => {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setAvatar("");
    if (!addressOrName) return;

    (async () => {
      const avatar = await goerliProvider?.getAvatar(addressOrName);
      setAvatar(avatar || "");
    })();
  }, [addressOrName]);

  return avatar;
};

export default useENSAvatar;
