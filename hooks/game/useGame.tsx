import { useContext, useEffect, useRef } from "react";
import { AppContext } from "~/contexts";
import Game from "~/game/Game";
import { UIManagerHandler } from "~/game/ui/UIManager";
import { PhiObject } from "~/types";

const useGame = (isCreatedPhiland: boolean, phiObjects: PhiObject[], handler: UIManagerHandler): Game => {
  const _strictRef = useRef(false); // for avoiding react18 strict mode
  const loadGameRef = useRef(false);
  const { game } = useContext(AppContext);

  useEffect(() => {
    if (_strictRef.current) return;
    _strictRef.current = true;

    (async () => {
      await game.loadGame(handler);
      loadGameRef.current = true;
    })();
  }, []);

  useEffect(() => {
    if (!loadGameRef.current) return;

    if (isCreatedPhiland) {
      game.room.enterRoom();
    } else {
      game.room.leaveRoom();
    }
  }, [isCreatedPhiland, loadGameRef.current]);

  useEffect(() => {
    if (!loadGameRef.current) return;
    if (phiObjects.length <= 0) return;

    game.room.leaveRoom();
    game.room.enterRoom();
    game.room.roomItemManager.loadItems(phiObjects);
  }, [phiObjects.length, loadGameRef.current]);

  return game;
};

export default useGame;
