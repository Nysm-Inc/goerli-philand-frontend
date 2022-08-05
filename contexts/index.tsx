import { createContext, FC, ReactNode, useCallback, useEffect, useState } from "react";
import type Game from "~/game/Game";
import { Tx } from "~/types/tx";
import useColorMode from "~/hooks/color";
import { ColorMode } from "~/ui/styles";

type AppContext = {
  game: Game;
  txs: { [hash: string]: Tx };
  addTx: (tx: Tx) => void;
  colorMode: ColorMode;
  toggleColorMode: () => void;
};

// @ts-ignore
export const AppContext = createContext<AppContext>();

const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [game, setGame] = useState<Game>();
  const [colorMode, toggleColorMode] = useColorMode();
  const [txs, setTxs] = useState<{ [hash: string]: Tx }>({});

  const addTx = useCallback((tx: Tx) => {
    if (!tx.hash) return;

    // @ts-ignore
    setTxs((prev) => ({ ...prev, [tx.hash]: tx }));
  }, []);

  useEffect(() => {
    import("~/game/GameInstance")
      .then((GameInstance) => {
        setGame(GameInstance.default.get());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    game?.engine.changeColorMode(colorMode);
  }, [colorMode, game]);

  return (
    <>{game ? <AppContext.Provider value={{ game, txs, addTx, colorMode, toggleColorMode }}>{children}</AppContext.Provider> : <></>}</>
  );
};

export default AppContextProvider;
