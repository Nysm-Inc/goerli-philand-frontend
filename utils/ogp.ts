import { UPLOAD_OGP_API_GATEWAY } from "~/constants";

export const updateOGP = async (ens: string | null | undefined, dataurl: string) => {
  const body = {
    name: ens + ".png",
    file: dataurl,
  };
  return await fetch(UPLOAD_OGP_API_GATEWAY, {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
