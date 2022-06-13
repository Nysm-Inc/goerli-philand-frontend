import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { UTILS_API_GATEWAY } from "~/constants";
import { useViewPhiland } from "~/hooks/map";
import { useGame } from "~/hooks/game";
import { useCreatePhiland } from "~/hooks/registry";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const res = await axios.get<{ images: string[] }>(`${UTILS_API_GATEWAY}/list?name=${query.ens}`);
    const images = res.data.images;
    const ogp = images.length > 0 ? images[images.length - 1] : "";
    return { props: { ogp, query } };
  } catch {
    return { props: { ogp: "", query } };
  }
};

const Index: NextPage = () => {
  const router = useRouter();
  const ens = decodeURI(router.asPath).substring(1);

  const [isCreated] = useCreatePhiland(ens);
  const phiObjects = useViewPhiland(ens);
  useGame(isCreated, phiObjects, {});

  return <></>;
};

export default Index;
