import { useContext } from "react";
import { AppContext } from "~/contexts";
import { IObject, ObjectContractAddress, PhiLink, PhiObject } from "~/types";
import { SaveArgs } from "~/hooks/map";
import { WALLPAPER_CONTRACT_ADDRESS } from "~/constants";

export type UIHandler = {
  edit: () => void;
  view: () => void;
  tryWrite: (contract: ObjectContractAddress, tokenId: number) => void;
  tryRemove: (contract: ObjectContractAddress, tokenId: number) => void;
  changeLink: (id: string, link: PhiLink) => void;
  save: ({ removeArgs, writeArgs, linkArgs }: SaveArgs) => void;
};

const useHandler = ({
  phiObjects,
  uiHandler,
}: {
  phiObjects: (PhiObject & { removeIdx: number })[];
  uiHandler?: UIHandler;
}): {
  onEdit: () => void;
  onView: () => void;
  onMoveObject: () => void;
  onDropObject: () => void;
  onPickInventoryObject: (object: IObject) => void;
  onRemoveObject: (uuid: string) => void;
  onChangeLink: (id: string, link: PhiLink) => void;
  onSave: () => void;
} => {
  const { game } = useContext(AppContext);

  const onEdit = () => {
    game.room.edit();
    uiHandler?.edit();
  };
  const onView = () => {
    game.room.leaveRoom();
    game.room.enterRoom();
    game.room.roomItemManager.loadItems(phiObjects);
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
  const onSave = () => {
    const roomItems = game.room.roomItemManager.getItems();
    const prevPhiObjects = phiObjects;
    const newPhiObjects = Object.values(roomItems).map((item) => item.getPhiObject());

    const removeIdxs = prevPhiObjects.map((prevObject) => prevObject.removeIdx);
    const writeArgs = newPhiObjects;
    const linkArgs = newPhiObjects.map((newPhiObject) => newPhiObject.link);

    if (removeIdxs.length > 0 || writeArgs.length > 0) {
      uiHandler?.save({
        removeArgs: { removeIdxs: removeIdxs, remove_check: removeIdxs.length > 0 },
        writeArgs,
        linkArgs,
        wallpaperArgs: { change_wall_check: false, contractAddress: WALLPAPER_CONTRACT_ADDRESS, tokenId: 1 },
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
    onSave,
  };
};

export default useHandler;
