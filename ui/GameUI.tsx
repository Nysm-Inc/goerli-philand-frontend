import { useEffect } from "react";
import GameInstance from "~/game/GameInstance";

const Game = () => {
  useEffect(() => {
    const { loadGame } = GameInstance.get();
    loadGame();
  }, []);

  return <></>;
};

export default Game;
