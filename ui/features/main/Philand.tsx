import { FC } from "react";
import { useDisclosure, useBoolean } from "@chakra-ui/react";
import Quest from "~/ui/features/quest";
import Shop from "~/ui/features/shop";
import Inventory, { useInventory } from "~/ui/features/inventory";
import Collection from "~/ui/features/collection";
import {
  ActionMenu,
  useActionMenu,
  LinkMenu,
  useLinkMenu,
  MenuBar,
  Permissions,
  Share,
  MainMenu,
  WallpaperMenu,
  useWallpaperMenu,
} from "~/ui/components";
import { useWallpaper, useDeposit, useSave } from "~/hooks/map";
import { useApprove, useBalances, useTotalSupply } from "~/hooks/object";
import { useClaim, useClaimableList } from "~/hooks/claim";
import { useGame } from "~/hooks/game";
import { useGetFreeObject } from "~/hooks/free";
import { useBuyPremiumObject } from "~/hooks/premium";
import useGetWallpaper from "~/hooks/wallpaper";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  QUEST_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
} from "~/constants";
import { PhiLink, PhiObject } from "~/types";

const Philand: FC<{
  address: string;
  currentENS: string;
  domains: string[];
  switchCurrentENS: (ens: string) => void;
  phiObjects: (PhiObject & {
    removeIdx: number;
  })[];
}> = ({ address, currentENS, domains, switchCurrentENS, phiObjects }) => {
  const [isEdit, { on: edit, off: view }] = useBoolean(false);
  const [actionMenuState, onOpenActionMenu, onCloseActionMenu] = useActionMenu();
  const [linkState, onOpenLinkMenu, onCloseLinkMenu, changeLink] = useLinkMenu();
  const [wallpaperMenuState, onOpenWallpaperMenu, onCloseWallpaperMenu] = useWallpaperMenu();
  const { isOpen: isOpenQuest, onOpen: onOpenQuest, onClose: onCloseQuest } = useDisclosure();
  const { isOpen: isOpenShop, onOpen: onOpenShop, onClose: onCloseShop } = useDisclosure();
  const { isOpen: isOpenCollection, onOpen: onOpenCollection, onClose: onCloseCollection } = useDisclosure();
  const { isOpen: isOpenInventory, onOpen: onOpenInventry, onClose: onCloseInventory } = useDisclosure();
  const { isOpen: isOpenPermissions, onOpen: onOpenPermissions, onClose: onClosePermissions } = useDisclosure();

  const wallpaper = useWallpaper(currentENS);
  const [isAprvPhi, { approve: aprvPhi }] = useApprove(QUEST_OBJECT_CONTRACT_ADDRESS, address);
  const [isAprvFree, { approve: aprvFree }] = useApprove(FREE_OBJECT_CONTRACT_ADDRESS, address);
  const [isAprvPre, { approve: aprvPre }] = useApprove(PREMIUM_OBJECT_CONTRACT_ADDRESS, address);
  const [isAprvWall, { approve: aprvWall }] = useApprove(WALLPAPER_CONTRACT_ADDRESS, address);
  const [claimedList, { claimPhi }] = useClaim(address);
  const totalSupply = useTotalSupply(QUEST_OBJECT_CONTRACT_ADDRESS);
  const { getFreeObject } = useGetFreeObject();
  const { buyPremiumObject } = useBuyPremiumObject();
  const { batchWallPaper } = useGetWallpaper();
  const balancePhiObjects = useBalances(QUEST_OBJECT_CONTRACT_ADDRESS, address);
  const balanceFreeObjects = useBalances(FREE_OBJECT_CONTRACT_ADDRESS, address);
  const balancePremiumObjects = useBalances(PREMIUM_OBJECT_CONTRACT_ADDRESS, address);
  const balanceWallpapers = useBalances(WALLPAPER_CONTRACT_ADDRESS, address);
  const [depositObjects, { deposit, withdraw }] = useDeposit(currentENS);
  const { save } = useSave(currentENS);
  const [claimableList, updateClaimableList] = useClaimableList(address);
  const [inventoryObjects, plus, minus, tryWrite, tryRemove, reset] = useInventory(depositObjects, isEdit);

  const {
    state: { initialized },
    handler: { onEdit, onView, onDropObject, onMoveObject, onPickInventoryObject, onRemoveObject, onChangeLink, onChangeWallpaper, onSave },
  } = useGame({
    state: { currentENS, isEdit, phiObjects, wallpaper },
    uiHandler: { edit, view, tryWrite, tryRemove, changeLink, save },
    gameUIHandler: { onOpenActionMenu, onOpenWallpaperMenu, onChangeLinkMenu: changeLink },
  });

  return (
    <>
      <MenuBar
        initialized={initialized}
        isEdit={isEdit}
        isOpen={{ collection: isOpenCollection, inventory: isOpenInventory }}
        currentENS={currentENS}
        domains={domains}
        actionHandler={{
          onOpenCollection,
          onOpenInventry,
          onSwitchCurrentENS: switchCurrentENS,
          onView,
          onEdit,
          onSave,
        }}
      />
      <Quest
        claimableList={claimableList}
        claimedList={claimedList}
        totalSupply={totalSupply}
        isOpen={isOpenQuest}
        onOpenCollection={onOpenCollection}
        onClose={onCloseQuest}
        onClickItem={claimPhi}
        onClickUpdate={updateClaimableList}
      />
      <Shop
        isOpen={isOpenShop}
        onOpenCollection={onOpenCollection}
        onClose={onCloseShop}
        onSubmit={{
          [FREE_OBJECT_CONTRACT_ADDRESS]: getFreeObject,
          [PREMIUM_OBJECT_CONTRACT_ADDRESS]: buyPremiumObject,
          [WALLPAPER_CONTRACT_ADDRESS]: batchWallPaper,
        }}
      />
      <Collection
        items={[...balancePhiObjects, ...balanceFreeObjects, ...balancePremiumObjects, ...balanceWallpapers]}
        isApproved={{
          [QUEST_OBJECT_CONTRACT_ADDRESS]: isAprvPhi,
          [FREE_OBJECT_CONTRACT_ADDRESS]: isAprvFree,
          [PREMIUM_OBJECT_CONTRACT_ADDRESS]: isAprvPre,
          [WALLPAPER_CONTRACT_ADDRESS]: isAprvWall,
        }}
        isEdit={isEdit}
        isOpen={isOpenCollection}
        onOpenInventory={onOpenInventry}
        onOpenPermissions={onOpenPermissions}
        onClose={onCloseCollection}
        onSubmit={deposit}
      />
      <Inventory
        objects={inventoryObjects}
        isEdit={isEdit}
        isOpen={isOpenInventory}
        onOpenCollection={onOpenCollection}
        onClose={onCloseInventory}
        onClickPlus={plus}
        onClickMinus={minus}
        onClickObject={onPickInventoryObject}
        onSubmit={withdraw}
        reset={reset}
      />
      <Permissions
        isApproved={{
          [QUEST_OBJECT_CONTRACT_ADDRESS]: isAprvPhi,
          [FREE_OBJECT_CONTRACT_ADDRESS]: isAprvFree,
          [PREMIUM_OBJECT_CONTRACT_ADDRESS]: isAprvPre,
          [WALLPAPER_CONTRACT_ADDRESS]: isAprvWall,
        }}
        onApprove={{
          [QUEST_OBJECT_CONTRACT_ADDRESS]: aprvPhi,
          [FREE_OBJECT_CONTRACT_ADDRESS]: aprvFree,
          [PREMIUM_OBJECT_CONTRACT_ADDRESS]: aprvPre,
          [WALLPAPER_CONTRACT_ADDRESS]: aprvWall,
        }}
        isOpen={isOpenPermissions}
        onClose={onClosePermissions}
      />

      {isEdit ? (
        <>
          <ActionMenu
            state={actionMenuState}
            onClose={onCloseActionMenu}
            onBack={onDropObject}
            onClickMove={onMoveObject}
            onClickLink={() => {
              onOpenLinkMenu({ ...linkState[actionMenuState.id], id: actionMenuState.id, x: actionMenuState.x, y: actionMenuState.y });
            }}
            onClickTrash={() => onRemoveObject(actionMenuState.id)}
          />
          <LinkMenu
            state={linkState[actionMenuState.id]}
            onClose={onCloseLinkMenu}
            onBack={onDropObject}
            onChange={(id: string, link: PhiLink) => onChangeLink(id, { title: link.title, url: link.url })}
          />
          <WallpaperMenu
            state={wallpaperMenuState}
            isApprovedWallpaper={isAprvWall}
            currentWallpaper={wallpaper}
            balanceWallpapers={balanceWallpapers}
            onClose={onCloseWallpaperMenu}
            onChangeWallpaper={onChangeWallpaper}
          />
        </>
      ) : (
        <>
          <MainMenu isOpenQuest={isOpenQuest} isOpenShop={isOpenShop} onOpenQuest={onOpenQuest} onOpenShop={onOpenShop} />
          <Share currentENS={currentENS} />
        </>
      )}
    </>
  );
};

export default Philand;
