import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "~/contexts";
import { UIManagerHandler } from "~/game/ui/UIManager";
import { PhiObject, Wallpaper } from "~/types";
import useHandler, { UIHandlerProps, Handler } from "./useHandler";

type UseGame = {
  state: {
    currentENS: string;
    isEdit: boolean;
    phiObjects: (PhiObject & { removeIdx: number })[];
    wallpaper?: Wallpaper;
  };
  uiHandler?: UIHandlerProps;
  gameUIHandler?: UIManagerHandler;
};

const useGame = ({ state, uiHandler, gameUIHandler }: UseGame): { state: { initialized: boolean }; handler: Handler } => {
  const _strictRef = useRef(false); // for avoiding react18 strict mode
  const [loadedGame, setLoadedGame] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const { game } = useContext(AppContext);
  const controller = {
    state: { initialized },
    handler: useHandler({ phiObjects: state.phiObjects, wallpaper: state.wallpaper, uiHandler }),
  };

  useEffect(() => {
    if (_strictRef.current) return;
    _strictRef.current = true;

    (async () => {
      await game.loadGame(gameUIHandler);
      setLoadedGame(true);
    })();
  }, []);

  useEffect(() => {
    if (!loadedGame) return;

    game.room.enterRoom();
    return () => {
      game.room.leaveRoom();
      game.room.view();
    };
  }, [state.currentENS, loadedGame]);

  useEffect(() => {
    if (!loadedGame) return;
    if (state.isEdit) return;
    game.room.roomItemManager.loadItems(state.phiObjects);

    setInitialized(true);
  }, [state.currentENS, state.phiObjects.length, loadedGame, state.isEdit]);

  useEffect(() => {
    if (!loadedGame) return;

    game.room.wallpaper.update(state.wallpaper?.tokenId || 0);
  }, [state.wallpaper?.tokenId, loadedGame]);

  return controller;
};

export default useGame;
