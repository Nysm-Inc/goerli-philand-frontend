import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "~/contexts";
import { UIManagerHandler } from "~/game/ui/UIManager";
import { PhiObject } from "~/types";
import useHandler, { UIHandler } from "./useHandler";

type UseGame = {
  state: {
    isEdit: boolean;
    isCreatedPhiland: boolean;
    phiObjects: (PhiObject & { removeIdx: number })[];
  };
  uiHandler?: UIHandler;
  gameUIHandler?: UIManagerHandler;
};

const useGame = ({ state, uiHandler, gameUIHandler }: UseGame) => {
  const _strictRef = useRef(false); // for avoiding react18 strict mode
  const [loadGame, setLoadGame] = useState(false);
  const { game, colorMode } = useContext(AppContext);

  useEffect(() => {
    if (_strictRef.current) return;
    _strictRef.current = true;

    (async () => {
      await game.loadGame(gameUIHandler);
      setLoadGame(true);
    })();
  }, []);

  useEffect(() => {
    if (!loadGame) return;

    if (state.isCreatedPhiland) {
      game.room.enterRoom();
    } else {
      game.room.leaveRoom();
    }
  }, [state.isCreatedPhiland, loadGame]);

  useEffect(() => {
    if (!loadGame) return;
    if (state.isEdit) return;
    if (state.phiObjects.length <= 0) return;

    game.room.roomItemManager.loadItems(state.phiObjects);
  }, [state.phiObjects.length, loadGame, state.isEdit]);

  useEffect(() => {
    game.engine.changeColorMode(colorMode);
  }, [colorMode]);

  return useHandler({ phiObjects: state.phiObjects, uiHandler });
};

export default useGame;
