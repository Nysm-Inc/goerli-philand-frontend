import { GetServerSideProps, NextPage } from "next";
import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { OGP_API_GATEWAY } from "~/constants";
import { AppContext } from "~/contexts";
import { useViewPhiland } from "~/hooks/map";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const res = await axios.get<{ images: string[] }>(`${OGP_API_GATEWAY}/list?name=${query.ens}`);
    const images = res.data.images;
    const ogp = images.length > 0 ? images[images.length - 1] : "";
    return { props: { ogp, query } };
  } catch {
    return { props: { ogp: "", query } };
  }
};

const Index: NextPage = () => {
  const loadGameRef = useRef(false);
  const loadedGameRef = useRef(false);

  const { game } = useContext(AppContext);
  const phiObjects = useViewPhiland("oji4.eth");

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
