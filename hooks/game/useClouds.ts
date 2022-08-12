import { useContext, useEffect } from "react";
import { AppContext } from "~/contexts";

const useClouds = (isMobile?: boolean) => {
  const { game } = useContext(AppContext);

  useEffect(() => {
    if (isMobile) {
      game.engine.hideClouds();
    } else {
      game.engine.showClouds();
    }
  }, [isMobile]);
};

export default useClouds;
