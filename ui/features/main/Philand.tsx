import { FC } from "react";
import { useDisclosure, useBoolean, Box } from "@chakra-ui/react";
import Quest from "~/ui/features/quest";
import Shop from "~/ui/features/shop";
import Land, { useLand } from "~/ui/features/land";
import Wallet from "~/ui/features/wallet";
import { useWallpaper, useDeposit, useSave } from "~/hooks/map";
import { useBalances, useTotalSupply } from "~/hooks/object";
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
import MenuBar from "~/ui/components/MenuBar";
import Share from "~/ui/components/Share";
import MainMenu from "~/ui/components/MainMenu";
import HowItWorks from "~/ui/components/HowItWorks";
import QuickTour from "~/ui/components/QuickTour";
import ActionMenu, { useActionMenu } from "~/ui/components/ActionMenu";
import LinkMenu, { useLinkMenu } from "~/ui/components/LinkMenu";
import WallpaperMenu, { useWallpaperMenu } from "~/ui/components/WallpaperMenu";
import Help from "~/ui/components/Help";

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

  const wallpaper = useWallpaper(currentENS);
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
  const [landObjects, plus, minus, setLandObjects, tryWrite, tryRemove, reset] = useLand(depositObjects, isEdit);

  const {
    state: { initialized },
    handler: {
      onEdit,
      onView,
      onDropObject,
      onMoveObject,
      onPickLandObject,
      onRemoveObject,
      onChangeLink,
      onChangeWallpaper,
      onCheckDiff,
      onSave,
    },
  } = useGame({
    state: { currentENS, isEdit, phiObjects, wallpaper },
    uiHandler: { edit, view, tryWrite, tryRemove, changeLink, save },
    gameUIHandler: { onOpenActionMenu, onOpenWallpaperMenu, onChangeLinkMenu: changeLink },
  });

  return (
    <>
      <Help onOpenHowItWorks={onOpenHowItWorks} />
      <HowItWorks isOpen={isOpenHowItWorks} onOpen={onOpenHowItWorks} onClose={onCloseHowItWorks} />
      <Box {...(isEdit && { opacity: "0" })}>
        <QuickTour />
      </Box>

      <MenuBar
        initialized={initialized}
        noObjectsInLand={depositObjects.length === 0 && phiObjects.length === 0}
        isEdit={isEdit}
        isOpen={{ wallet: isOpenWallet, land: isOpenLand }}
        currentENS={currentENS}
        domains={domains}
        actionHandler={{
          onOpenWallet,
          onOpenLand,
          onCloseLand,
          onSwitchCurrentENS: switchCurrentENS,
          onView,
          onEdit,
          onCheckDiff: () => onCheckDiff().isDiff,
          onSave,
        }}
      />
      <Quest
        claimableList={claimableList}
        claimedList={claimedList}
        totalSupply={totalSupply}
        isOpen={isOpenQuest}
        onOpenWallet={onOpenWallet}
        onClose={onCloseQuest}
        onClickItem={claimPhi}
        onClickUpdate={updateClaimableList}
      />
      <Shop
        isOpen={isOpenShop}
        onOpenWallet={onOpenWallet}
        onClose={onCloseShop}
        onSubmit={{
          [FREE_OBJECT_CONTRACT_ADDRESS]: getFreeObject,
          [PREMIUM_OBJECT_CONTRACT_ADDRESS]: buyPremiumObject,
          [WALLPAPER_CONTRACT_ADDRESS]: batchWallPaper,
        }}
      />
      <Wallet
        items={[...balancePhiObjects, ...balanceFreeObjects, ...balancePremiumObjects, ...balanceWallpapers]}
        isEdit={isEdit}
        isOpen={isOpenWallet}
        onOpenLand={onOpenLand}
        onClose={onCloseWallet}
        onSubmit={deposit}
      />
      <Land
        objects={landObjects}
        isEdit={isEdit}
        isOpen={isOpenLand}
        onOpenWallet={onOpenWallet}
        onClose={onCloseLand}
        setObjects={setLandObjects}
        onClickPlus={plus}
        onClickMinus={minus}
        onClickObject={onPickLandObject}
        onSubmit={withdraw}
        reset={reset}
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
