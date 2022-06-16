import { useContext } from "react";
import { AppContext } from "~/contexts";
import { IObject, PhiObject } from "~/types";
import { SaveArgs } from "~/hooks/map";

type UseHandler = {
  phiObjects: (PhiObject & { removeIdx: number })[];
  edit: () => void;
  view: () => void;
  invPlusUsed: (contract: string, tokenId: number) => void;
  invMinusUsed: (contract: string, tokenId: number) => void;
  invReset: () => void;
  save: ({ removeArgs, writeArgs, linkArgs }: SaveArgs) => void;
};

const useHandler = ({
  phiObjects,
  edit,
  view,
  invPlusUsed,
  invMinusUsed,
  invReset,
  save,
}: UseHandler): {
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
    edit();
  };
  const onView = () => {
    game.room.leaveRoom();
    game.room.enterRoom();
    game.room.roomItemManager.loadItems(phiObjects);
    game.room.view();
    view();
    invReset();
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
    invMinusUsed(object.contractAddress, object.tokenId);
  };
  const onPickInventoryObject = (object: IObject) => {
    game.room.movingItemManager.pickFromInventory(object);
    invPlusUsed(object.contractAddress, object.tokenId);
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
      if (newPhiObjects.some((newObject) => prevObject === newObject)) {
        return memo;
      } else {
        return [...memo, prevObject.removeIdx];
      }
    }, [] as (string | number)[]);
    const writeArgs = newPhiObjects.reduce((memo, newObject) => {
      if (prevPhiObjects.some((prevObject) => prevObject === newObject)) {
        return memo;
      } else {
        return [...memo, newObject];
      }
    }, [] as PhiObject[]);

    save({
      removeArgs: { removeIdxs: removeIdxs, remove_check: removeIdxs.length > 0 },
      writeArgs,
      linkArgs: writeArgs.map(() => {
        return { title: "", url: "" };
      }),
    });
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
