import { FC, useCallback } from "react";
import { useDisclosure, useBoolean } from "@chakra-ui/react";
import Quest from "~/ui/features/quest";
import Shop from "~/ui/features/shop";
import Land from "~/ui/features/land";
import { useLand } from "~/ui/features/land/useLand";
import Wallet from "~/ui/features/wallet";
import { useWallpaper, useDeposit, useSave } from "~/hooks/map";
import { useBalances, useTotalSupply } from "~/hooks/object";
import { useClaim, useClaimableList, useQuestProgress } from "~/hooks/claim";
import useGame from "~/hooks/game/useGame";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  QUEST_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
} from "~/constants";
import { PhiLink, PhiObject } from "~/types";
import MenuBar from "~/ui/components/MenuBar";
import Share from "~/ui/components/Share";
import MainMenu from "~/ui/components/MainMenu";
import HowItWorks from "~/ui/components/HowItWorks";
import QuickTour from "~/ui/components/QuickTour";
import ActionMenu, { useActionMenu } from "~/ui/components/ActionMenu";
import LinkMenu, { useLinkMenu } from "~/ui/components/LinkMenu";
import WallpaperMenu, { useWallpaperMenu } from "~/ui/components/WallpaperMenu";
import Help from "~/ui/components/Help";
import EditStatus from "~/ui/components/EditStatus";
import useBuyObjects from "~/hooks/shop";

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
  const { isOpen: isOpenWallet, onOpen: onOpenWallet, onClose: onCloseWallet } = useDisclosure();
  const { isOpen: isOpenLand, onOpen: onOpenLand, onClose: onCloseLand } = useDisclosure();
  const { isOpen: isOpenHowItWorks, onOpen: onOpenHowItWorks, onClose: onCloseHowItWorks } = useDisclosure();
  const onCloseModals = useCallback(() => (onCloseQuest(), onCloseShop(), onCloseWallet(), onCloseLand(), onCloseHowItWorks()), []);

  const wallpaper = useWallpaper(currentENS);
  const [claimableList, updateClaimableList] = useClaimableList(address);
  const progressList = useQuestProgress(address);
  const [claimedList, { claimPhi }] = useClaim(address);
  const totalSupply = useTotalSupply(QUEST_OBJECT_CONTRACT_ADDRESS);
  const { buyObjects } = useBuyObjects(address);
  const balancePhiObjects = useBalances(QUEST_OBJECT_CONTRACT_ADDRESS, address);
  const balanceFreeObjects = useBalances(FREE_OBJECT_CONTRACT_ADDRESS, address);
  const balancePremiumObjects = useBalances(PREMIUM_OBJECT_CONTRACT_ADDRESS, address);
  const balanceWallpapers = useBalances(WALLPAPER_CONTRACT_ADDRESS, address);
  const [depositObjects, { deposit, withdraw }] = useDeposit(currentENS);
  const { save, tx: txSave } = useSave(currentENS);
  const [landObjects, plus, minus, setLandObjects, tryWrite, tryRemove, reset] = useLand(depositObjects, isEdit);

  const {
    state: { initialized, isDiff },
    handler: { onEdit, onView, onDropObject, onMoveObject, onPickLandObject, onRemoveObject, onChangeLink, onChangeWallpaper, onSave },
  } = useGame({
    state: { currentENS, isEdit, phiObjects, wallpaper },
    uiHandler: { edit, view, tryWrite, tryRemove, changeLink, save },
    gameUIHandler: { onOpenActionMenu, onOpenWallpaperMenu, onChangeLinkMenu: changeLink, onPlaceFromLand: tryWrite },
  });

  return (
    <>
      <Help onOpenHowItWorks={onOpenHowItWorks} />
      <HowItWorks isOpen={isOpenHowItWorks} onOpen={onOpenHowItWorks} onClose={onCloseHowItWorks} />
      <QuickTour isEdit={isEdit} ens={currentENS} />

      <MenuBar
        initialized={initialized}
        isDiff={isDiff}
        noObjectsInLand={depositObjects.length === 0 && phiObjects.length === 0}
        isEdit={isEdit}
        isOpen={{ wallet: isOpenWallet, land: isOpenLand }}
        currentENS={currentENS}
        domains={domains}
        currentWallpaper={wallpaper}
        balanceWallpapers={balanceWallpapers}
        actionHandler={{
          onOpenWallet,
          onOpenLand,
          onCloseLand,
          onSwitchCurrentENS: switchCurrentENS,
          onChangeWallpaper,
          onView,
          onEdit,
          onSave,
        }}
      />
      <Quest
        claimableList={claimableList}
        progressList={progressList}
        claimedList={claimedList}
        totalSupply={totalSupply}
        isOpen={isOpenQuest}
        onClose={onCloseQuest}
        onClickItem={claimPhi}
        onClickUpdate={updateClaimableList}
        onClickNavi={() => (onCloseModals(), onOpenWallet())}
      />
      <Shop
        address={address}
        isOpen={isOpenShop}
        onClose={onCloseShop}
        onSubmit={buyObjects}
        onClickNavi={() => (onCloseModals(), onOpenWallet())}
      />
      <Wallet
        items={[...balancePhiObjects, ...balanceFreeObjects, ...balancePremiumObjects, ...balanceWallpapers]}
        isOpen={isOpenWallet}
        onClose={onCloseWallet}
        onSubmit={deposit}
        onClickNavi={() => (onCloseModals(), onEdit(), onOpenLand())}
      />
      <Land
        objects={landObjects}
        isEdit={isEdit}
        isOpen={isOpenLand}
        onClose={onCloseLand}
        setObjects={setLandObjects}
        onClickPlus={plus}
        onClickMinus={minus}
        onClickObject={onPickLandObject}
        onSubmit={withdraw}
        reset={reset}
        onClickNavi={() => (onCloseModals(), onOpenWallet())}
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
            currentWallpaper={wallpaper}
            balanceWallpapers={balanceWallpapers}
            onClose={onCloseWallpaperMenu}
            onChangeWallpaper={onChangeWallpaper}
          />
          <EditStatus isDiff={isDiff} saveTx={txSave} />
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
