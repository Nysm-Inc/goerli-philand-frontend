import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "~/contexts";
import { useViewPhiland } from "~/hooks/map";

const Index: NextPage = () => {
  const loadGameRef = useRef(false);
  const loadedGameRef = useRef(false);

  const router = useRouter();
  const asPath = router.asPath;
  const { game } = useContext(AppContext);

  const phiObjects = useViewPhiland(asPath.substring(1));

  useEffect(() => {
    if (loadGameRef.current) return;
    loadGameRef.current = true;

    (async () => {
      await game.loadGame();
      loadedGameRef.current = true;
    })();
  }, []);
  useEffect(() => {
    if (!loadedGameRef.current) return;

    game.room.leaveRoom();
    game.room.enterRoom();
    game.room.roomItemManager.loadItems(phiObjects);
  }, [phiObjects.length, loadedGameRef.current]);

  return <></>;
};

export default Index;
