import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useBreakpointValue } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { UTILS_API_GATEWAY } from "~/constants";
import { useWallpaper, useViewPhiland } from "~/hooks/map";
import { useGame } from "~/hooks/game";
import { useCreatePhiland } from "~/hooks/registry";
import Dev from "~/ui/components/Dev";
import Header from "~/ui/components/Header";
import HeaderMd from "~/ui/components/HeaderMd";
import LandNotFound from "~/ui/components/LandNotFound";

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

  const [{ isCreated, isFetched }] = useCreatePhiland("", ens);
  const { phiObjects } = useViewPhiland(ens);
  const isPhilandCreated = isCreated || phiObjects.length > 0;
  const wallpaper = useWallpaper(ens);

  useGame({ state: { currentENS: ens, isEdit: false, phiObjects, wallpaper } });

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
      {isMobile ? (
        <>
          <HeaderMd />
          {isFetched && !isPhilandCreated && <LandNotFound ens={ens} w="360px" />}
        </>
      ) : (
        <>
          <Header />
          {isFetched && !isPhilandCreated && <LandNotFound ens={ens} />}
        </>
      )}
    </>
  );
};

export default Index;
