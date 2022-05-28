import { createContext, FC, ReactNode, useEffect, useState } from "react";
import Game from "~/game/Game";
import GameInstance from "~/game/GameInstance";

type AppContext = {
  game: Game;
};

// @ts-ignore
export const AppContext = createContext<AppContext>();

const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    setGame(GameInstance.get());
  }, []);

  return <>{game ? <AppContext.Provider value={{ game }}>{children}</AppContext.Provider> : <></>}</>;
};

export default AppContextProvider;
