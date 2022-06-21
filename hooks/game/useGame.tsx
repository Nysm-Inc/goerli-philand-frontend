import { useContext, useEffect, useRef } from "react";
import { AppContext } from "~/contexts";
import { UIManagerHandler } from "~/game/ui/UIManager";
import { PhiObject } from "~/types";
import useHandler, { UIHandler } from "./useHandler";

type UseGame = {
  state: { isCreatedPhiland: boolean; phiObjects: (PhiObject & { removeIdx: number })[] };
  uiHandler?: UIHandler;
  gameUIHandler?: UIManagerHandler;
};

const useGame = ({ state, uiHandler, gameUIHandler }: UseGame) => {
  const _strictRef = useRef(false); // for avoiding react18 strict mode
  const loadGameRef = useRef(false);
  const { game } = useContext(AppContext);

  useEffect(() => {
    if (_strictRef.current) return;
    _strictRef.current = true;

    (async () => {
      await game.loadGame(gameUIHandler);
      loadGameRef.current = true;
    })();
  }, []);

  useEffect(() => {
    if (!loadGameRef.current) return;

    if (state.isCreatedPhiland) {
      game.room.enterRoom();
    } else {
      game.room.leaveRoom();
    }
  }, [state.isCreatedPhiland, loadGameRef.current]);

  useEffect(() => {
    if (!loadGameRef.current) return;
    if (state.phiObjects.length <= 0) return;

    game.room.leaveRoom();
    game.room.enterRoom();
    game.room.roomItemManager.loadItems(state.phiObjects);
  }, [state.phiObjects.length, loadGameRef.current]);

  return useHandler({ phiObjects: state.phiObjects, uiHandler });
};

export default useGame;
