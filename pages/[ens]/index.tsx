import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { LP_URL, UTILS_API_GATEWAY } from "~/constants";
import { useCheckWallpaper, useViewPhiland } from "~/hooks/map";
import { useGame } from "~/hooks/game";
import { useCreatePhiland } from "~/hooks/registry";
import { Header, Search } from "~/ui/components";

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

// todo
const Mobile: FC = () => {
  return (
    <>
      <Box
        position="fixed"
        top="8px"
        left="8px"
        cursor="pointer"
        onClick={() => {
          window.location.href = LP_URL;
        }}
      >
        <Image src="/icons/logo.svg" width="72px" height="80px" />
      </Box>

      <Box position="fixed" top="24px" left="90px">
        <Search w="256px" />
      </Box>
    </>
  );
};

const Index: NextPage = () => {
  const router = useRouter();
  const ens = decodeURI(router.asPath).substring(1);

  const [isCreated] = useCreatePhiland("", ens);
  const { phiObjects } = useViewPhiland(ens);
  const [wallpaper] = useCheckWallpaper(ens);

  useGame({ state: { currentENS: ens, isEdit: false, isCreatedPhiland: isCreated, phiObjects, wallpaper } });

  if (window.matchMedia("(any-pointer:coarse)").matches) {
    return <Mobile />;
  }
  return (
    <>
      <Header />
    </>
  );
};

export default Index;
