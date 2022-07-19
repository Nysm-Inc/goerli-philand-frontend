import { useContext } from "react";
import { TransactionResponse } from "@ethersproject/providers";
import { AppContext } from "~/contexts";
import { IObject, ObjectContractAddress, PhiLink, PhiObject, Wallpaper } from "~/types";
import { SaveArgs } from "~/hooks/map";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";

export type UIHandlerProps = {
  edit: () => void;
  view: () => void;
  tryWrite: (contract: ObjectContractAddress, tokenId: number) => void;
  tryRemove: (contract: ObjectContractAddress, tokenId: number) => void;
  changeLink: (id: string, link: PhiLink) => void;
  save: ({ removeArgs, writeArgs, linkArgs }: SaveArgs) => Promise<TransactionResponse | undefined>;
};

export type Handler = {
  onEdit: () => void;
  onView: () => void;
  onMoveObject: () => void;
  onDropObject: () => void;
  onPickInventoryObject: (object: IObject) => void;
  onRemoveObject: (uuid: string) => void;
  onChangeLink: (id: string, link: PhiLink) => void;
  onChangeWallpaper: (tokenId: number) => void;
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
  const onPickInventoryObject = (object: IObject) => {
    game.room.movingItemManager.pickFromInventory(object);
    uiHandler?.tryWrite(object.contractAddress, object.tokenId);
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
  const onSave = () => {
    const roomItems = game.room.roomItemManager.getItems();
    const prevPhiObjects = phiObjects;
    const newPhiObjects = Object.values(roomItems).map((item) => item.getPhiObject());

    const removeIdxs = prevPhiObjects.map((prevObject) => prevObject.removeIdx);
    const writeArgs = newPhiObjects;
    const linkArgs = newPhiObjects.map((newPhiObject) => newPhiObject.link);

    const prevWallpaper = wallpaper;
    const newWallpaper = game.room.wallpaper.get();

    if (removeIdxs.length > 0 || writeArgs.length > 0) {
      return uiHandler?.save({
        removeArgs: { removeIdxs: removeIdxs, remove_check: removeIdxs.length > 0 },
        writeArgs,
        linkArgs,
        wallpaperArgs: {
          change_wall_check: prevWallpaper?.tokenId !== newWallpaper?.tokenId,
          contractAddress: WALLPAPER_CONTRACT_ADDRESS,
          tokenId: newWallpaper?.tokenId || 0,
        },
      });
    }
  };

  return {
    onEdit,
    onView,
    onMoveObject,
    onDropObject,
    onPickInventoryObject,
    onRemoveObject,
    onChangeLink,
    onChangeWallpaper,
    // @ts-ignore
    onSave,
  };
};

export default useHandler;
