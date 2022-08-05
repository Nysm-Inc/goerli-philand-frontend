import { createContext, FC, ReactNode, useEffect, useState } from "react";
import type Game from "~/game/Game";
import useColorMode from "~/hooks/color";
import { ColorMode } from "~/ui/styles";

type AppContext = {
  game: Game;
  colorMode: ColorMode;
  toggleColorMode: () => void;
};

// @ts-ignore
export const AppContext = createContext<AppContext>();

const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [game, setGame] = useState<Game>();
  const [colorMode, toggleColorMode] = useColorMode();

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

  return <>{game ? <AppContext.Provider value={{ game, colorMode, toggleColorMode }}>{children}</AppContext.Provider> : <></>}</>;
};

export default AppContextProvider;
