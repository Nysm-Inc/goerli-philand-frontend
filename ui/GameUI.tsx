import { FC, useEffect } from "react";
import GameInstance from "~/game/GameInstance";

const GameUI: FC<{ onOpenActionMenu: (globalX: number, globalY: number) => void }> = ({ onOpenActionMenu }) => {
  //
  useEffect(() => {
    const { loadGame } = GameInstance.get();
    loadGame(onOpenActionMenu);
  }, []);

  return <></>;
};

export default GameUI;
