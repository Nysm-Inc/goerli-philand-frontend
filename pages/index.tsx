import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import useClouds from "~/hooks/game/useClouds";
import Main from "~/ui/features/main";
import Dev from "~/ui/components/Dev";
import Mobile from "~/ui/components/Mobile";

const Index: NextPage = () => {
  const { game } = useContext(AppContext);
  const isMobile = useBreakpointValue({ base: true, lg: false }, { ssr: false });

  useClouds(isMobile);
  useEffect(() => {
    isMobile ? game.engine.hide() : game.engine.show();
    return () => {
      isMobile && game.engine.show();
    };
  }, [isMobile]);

  return (
    <>
      <Dev />
      {isMobile ? <Mobile /> : <Main />}
    </>
  );
};

export default Index;
