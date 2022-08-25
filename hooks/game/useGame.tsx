import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "~/contexts";
import type { UIManagerHandler } from "~/game/ui/UIManager";
import { PhiObject, Wallpaper } from "~/types";
import { SaveArgs } from "~/hooks/map";
import { useInterval } from "./helper";

type UseGame = {
  state: {
    currentENS: string;
    isEdit: boolean;
    phiObjects: (PhiObject & { removeIdx: number })[];
    wallpaper?: Wallpaper;
  };
  handler?: {
    onCheckDiff: () => { isDiff: boolean; diff: SaveArgs };
  };
  gameUIHandler?: UIManagerHandler;
};

const useGame = ({ state, handler, gameUIHandler }: UseGame): { initialized: boolean; isDiff: boolean } => {
  const _strictRef = useRef(false); // for avoiding react18 strict mode
  const [loadedGame, setLoadedGame] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [isDiff, setIsDiff] = useState(false);
  const { game } = useContext(AppContext);

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

  useInterval(() => {
    if (!state.isEdit || !initialized) {
      setIsDiff(false);
      return;
    }
    setIsDiff(!!handler?.onCheckDiff()?.isDiff);
  }, 1000);

  return { initialized, isDiff };
};

export default useGame;
