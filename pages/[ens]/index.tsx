import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useBreakpointValue } from "@chakra-ui/react";
import axios from "axios";
import { UTILS_API_GATEWAY } from "~/constants";
import { useWallpaper, useViewPhiland } from "~/hooks/map";
import { useGame } from "~/hooks/game";
import { useCreatePhiland } from "~/hooks/registry";
import { Dev, Header, HeaderMd } from "~/ui/components";
import { useContext, useEffect } from "react";
import { AppContext } from "~/contexts";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const res = await axios.get<{ images: string[] }>(`${UTILS_API_GATEWAY}/images/list?name=${query.ens}`);
    const images = res.data.images;
    const ogp = images.length > 0 ? images[images.length - 1] : "";
    return { props: { ogp, query } };
  } catch {
    return { props: { ogp: "", query } };
  }
};

const Index: NextPage = () => {
  const { game } = useContext(AppContext);
  const router = useRouter();
  const ens = decodeURI(router.asPath).substring(1);

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const [isCreated] = useCreatePhiland("", ens);
  const { phiObjects } = useViewPhiland(ens);
  const wallpaper = useWallpaper(ens);

  useGame({ state: { currentENS: ens, isEdit: false, isCreatedPhiland: isCreated || phiObjects.length > 0, phiObjects, wallpaper } });

  useEffect(() => {
    if (isMobile) {
      game.engine.hideClouds();
    } else {
      game.engine.showClouds();
    }
  }, [isMobile]);

  return (
    <>
      <Dev />
      {isMobile ? <HeaderMd /> : <Header />}
    </>
  );
};

export default Index;
