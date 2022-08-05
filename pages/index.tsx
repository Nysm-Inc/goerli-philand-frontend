import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import { Dev, Mobile } from "~/ui/components";
import { AppContext } from "~/contexts";
import Main from "~/ui/features/main";

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
      {isMobile ? <Mobile /> : <Main />}
    </>
  );
};

export default Index;
