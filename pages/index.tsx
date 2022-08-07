import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Main from "~/ui/features/main";
import Dev from "~/ui/components/Dev";
import Mobile from "~/ui/components/Mobile";

const Index: NextPage = () => {
  const { game } = useContext(AppContext);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    if (isMobile) {
      game.engine.hideClouds();
      game.engine.hide();
    } else {
      game.engine.showClouds();
      game.engine.show();
    }
  }, [isMobile]);

  return (
    <>
      <Dev />
      {!isMobile ? <Main /> : <Mobile />}
    </>
  );
};

export default Index;
