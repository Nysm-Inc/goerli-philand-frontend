import { useContext } from "react";
import { AppContext } from "~/contexts";
import { IObject, ObjectContractAddress, PhiObject } from "~/types";
import { SaveArgs } from "~/hooks/map";

// todo
const equal = (a: PhiObject, b: PhiObject): boolean => {
  return (
    a.contractAddress === b.contractAddress &&
    a.tokenId === b.tokenId &&
    a.xStart === b.xStart &&
    a.xEnd === b.xEnd &&
    a.yStart === b.yStart &&
    a.yEnd === b.yEnd
  );
};

export type UIHandler = {
  edit: () => void;
  view: () => void;
  tryWrite: (contract: ObjectContractAddress, tokenId: number) => void;
  tryRemove: (contract: ObjectContractAddress, tokenId: number) => void;
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
  const onSave = () => {
    const prevPhiObjects = phiObjects;
    const newPhiObjects: PhiObject[] = Object.values(game.room.roomItemManager.getItems()).map((item) => {
      const [tileX, tileY] = item.getTile();
      const [sizeX, sizeY] = item.getSize();
      const object = item.getObject();
      return {
        contractAddress: object.contractAddress,
        tokenId: object.tokenId,
        xStart: tileX,
        yStart: tileY,
        xEnd: tileX + sizeX,
        yEnd: tileY + sizeY,
      };
    });

    const removeIdxs = prevPhiObjects.reduce((memo, prevObject) => {
      if (newPhiObjects.some((newObject) => equal(prevObject, newObject))) {
        return memo;
      } else {
        return [...memo, prevObject.removeIdx];
      }
    }, [] as (string | number)[]);
    const writeArgs = newPhiObjects.reduce((memo, newObject) => {
      if (prevPhiObjects.some((prevObject) => equal(prevObject, newObject))) {
        return memo;
      } else {
        return [...memo, newObject];
      }
    }, [] as PhiObject[]);

    if (removeIdxs.length > 0 || writeArgs.length > 0) {
      uiHandler?.save({
        removeArgs: { removeIdxs: removeIdxs, remove_check: removeIdxs.length > 0 },
        writeArgs,
        linkArgs: writeArgs.map(() => {
          return { title: "", url: "" };
        }),
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
    onSave,
  };
};

export default useHandler;
