import { useContext } from "react";
import type { TransactionResponse } from "@ethersproject/providers";
import { AppContext } from "~/contexts";
import { IObject, ObjectContractAddress, PhiLink, PhiObject, Wallpaper } from "~/types";
import { SaveArgs } from "~/hooks/map";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { diff } from "./helper";

export type UIHandlerProps = {
  edit: () => void;
  view: () => void;
  tryRemove: (contract: ObjectContractAddress, tokenId: number) => void;
  changeLink: (id: string, link: PhiLink) => void;
  changeScaled: (scaled: number) => void;
  save: ({ removeArgs, writeArgs, linkArgs }: SaveArgs) => Promise<TransactionResponse | undefined>;
};

export type Handler = {
  onEdit: () => void;
  onView: () => void;
  onMoveObject: () => void;
  onDropObject: () => void;
  onPickLandObject: (object: IObject) => void;
  onRemoveObject: (uuid: string) => void;
  onChangeLink: (id: string, link: PhiLink) => void;
  onChangeWallpaper: (tokenId: number) => void;
  onChangeScaled: (scaled: number) => void;
  onCheckDiff: () => { isDiff: boolean; diff: SaveArgs };
  onSave: () => Promise<TransactionResponse | undefined>;
};

const useHandler = ({
  phiObjects,
  wallpaper,
  uiHandler,
}: {
  phiObjects: (PhiObject & { removeIdx: number })[];
  wallpaper?: Wallpaper;
  uiHandler?: UIHandlerProps;
}): Handler => {
  const { game } = useContext(AppContext);

  const onEdit = () => {
    game.room.edit();
    uiHandler?.edit();
  };
  const onView = () => {
    game.room.leaveRoom();
    game.room.enterRoom();
    game.room.roomItemManager.loadItems(phiObjects);
    game.room.wallpaper.update(wallpaper?.tokenId || 0);
    game.room.view();
    uiHandler?.view();
  };
  const onDropObject = () => {
    game.room.movingItemManager.drop();
  };
  const onMoveObject = () => {
    game.room.movingItemManager.move();
  };
  const onRemoveObject = (uuid: string) => {
    const roomItems = game.room.roomItemManager.getItems();
    const item = roomItems[uuid];
    game.room.roomItemManager.removeItem(item.getUUID());
    const object = item.getObject();
    uiHandler?.tryRemove(object.contractAddress, object.tokenId);
  };
  const onPickLandObject = (object: IObject) => {
    game.room.movingItemManager.pickFromLand(object);
  };
  const onChangeLink = (uuid: string, link: PhiLink) => {
    const roomItems = game.room.roomItemManager.getItems();
    const item = roomItems[uuid];
    item.updateLink(link);
    uiHandler?.changeLink(uuid, link);
  };
  const onChangeWallpaper = (tokenId: number) => {
    game.room.wallpaper.update(tokenId);
  };
  const onChangeScaled = (scaled: number) => {
    game.engine.zoom(scaled);
    uiHandler?.changeScaled(scaled);
  };
  const onCheckDiff = () => {
    const roomItems = game.room.roomItemManager.getItems();
    const prevPhiObjects = phiObjects;
    const newPhiObjects = Object.values(roomItems).map((item) => item.getPhiObject());

    const diffRemove = diff(prevPhiObjects, newPhiObjects) as (PhiObject & { removeIdx: number })[];
    const diffWrite = diff(newPhiObjects, prevPhiObjects);
    const removeIdxs = diffRemove.map((prevPhiObject) => prevPhiObject.removeIdx);
    const writeArgs = diffWrite;
    const linkArgs = diffWrite.map((newPhiObject) => newPhiObject.link);

    const prevWallpaper = wallpaper;
    const newWallpaper = game.room.wallpaper.get();
    const changeWallpaper = prevWallpaper?.tokenId !== newWallpaper?.tokenId;

    return {
      isDiff: removeIdxs.length > 0 || writeArgs.length > 0 || changeWallpaper,
      diff: {
        removeArgs: { removeIdxs: removeIdxs },
        writeArgs,
        linkArgs,
        wallpaperArgs: {
          contractAddress: WALLPAPER_CONTRACT_ADDRESS,
          tokenId: newWallpaper?.tokenId || 0,
        },
      },
    };
  };
  const onSave = () => {
    const check = onCheckDiff();
    if (check.isDiff && uiHandler) {
      return uiHandler.save(check.diff);
    }
    return Promise.resolve(undefined);
  };

  return {
    onEdit,
    onView,
    onMoveObject,
    onDropObject,
    onPickLandObject,
    onRemoveObject,
    onChangeLink,
    onChangeWallpaper,
    onChangeScaled,
    onCheckDiff,
    onSave,
  };
};

export default useHandler;
