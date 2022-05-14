import { useEffect } from "react";
import GameInstance from "~/game/GameInstance";

const GameUI = () => {
  useEffect(() => {
    const { loadGame } = GameInstance.get();
    loadGame();
  }, []);

  return <></>;
};

export default GameUI;
