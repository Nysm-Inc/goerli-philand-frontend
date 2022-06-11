import { createContext, FC, ReactNode, useEffect, useState } from "react";
import type Game from "~/game/Game";

type AppContext = {
  game: Game;
};

// @ts-ignore
export const AppContext = createContext<AppContext>();

const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    import("~/game/GameInstance")
      .then((GameInstance) => {
        setGame(GameInstance.default.get());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <>{game ? <AppContext.Provider value={{ game }}>{children}</AppContext.Provider> : <></>}</>;
};

export default AppContextProvider;
