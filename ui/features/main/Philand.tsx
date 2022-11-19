import { useRouter } from "next/router";
import { FC, useCallback, useContext, useMemo } from "react";
import { useDisclosure, useBoolean } from "@chakra-ui/react";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  QUEST_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
} from "~/constants";
import { AppContext } from "~/contexts";
import { PhiObject } from "~/types";
import Quest from "~/ui/features/quest";
import Shop from "~/ui/features/shop";
import Land from "~/ui/features/land";
import { useLand } from "~/ui/features/land/useLand";
import Wallet from "~/ui/features/wallet";
import { useDeposit, useSave, useWallpaper } from "~/hooks/map";
import { useBalances, useTotalSupply } from "~/hooks/object";
import { useClaim, useClaimableList, useQuestProgress } from "~/hooks/claim";
import { useUpdateEXP } from "~/hooks/leaderboard/exp";
import useBuyObjects from "~/hooks/shop";
import useHandler from "~/hooks/game/useHandler";
import useGame from "~/hooks/game/useGame";
import useScore from "~/hooks/leaderboard/score";
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
import { useZoom } from "~/ui/components/Zoom";
import LinkList from "~/ui/components/LinkList";
import { isWallpaper } from "~/utils/object";

const Philand: FC<{
  address: string;
  currentENS: string;
  domains: string[];
  switchCurrentENS: (ens: string) => void;
  phiObjects: (PhiObject & { removeIdx: number })[];
  refetchPhiObjects: () => void;
}> = ({ address, currentENS, domains, switchCurrentENS, phiObjects, refetchPhiObjects }) => {
  const router = useRouter();
  const { game } = useContext(AppContext);
  const [isEdit, { on: edit, off: view }] = useBoolean(false);
  const [actionMenuState, onOpenActionMenu, onCloseActionMenu] = useActionMenu();
  const [linkState, onOpenLinkMenu, onCloseLinkMenu, changeLink] = useLinkMenu();
  const [wallpaperMenuState, onOpenWallpaperMenu, onCloseWallpaperMenu] = useWallpaperMenu();
  const { scaled, changeScaled } = useZoom();
  const { isOpen: isOpenQuest, onOpen: onOpenQuest, onClose: onCloseQuest } = useDisclosure();
  const { isOpen: isOpenShop, onOpen: onOpenShop, onClose: onCloseShop } = useDisclosure();
  const { isOpen: isOpenWallet, onOpen: onOpenWallet, onClose: onCloseWallet } = useDisclosure();
  const { isOpen: isOpenLand, onOpen: onOpenLand, onClose: onCloseLand } = useDisclosure();
  const { isOpen: isOpenHowItWorks, onOpen: onOpenHowItWorks, onClose: onCloseHowItWorks } = useDisclosure();
  const { isOpen: isOpenLinkList, onOpen: onOpenLinkList, onClose: onCloseLinkList } = useDisclosure();
  const onCloseModals = useCallback(() => (onCloseQuest(), onCloseShop(), onCloseWallet(), onCloseLand(), onCloseHowItWorks()), []);

  const { wallpaper, refetch: refetchWallpaper } = useWallpaper(currentENS);
  const [claimableList, updateClaimableList] = useClaimableList(address, isOpenQuest, isOpenQuest);
  const updateEXP = useUpdateEXP(address);
  const progressList = useQuestProgress(address, isOpenQuest, isOpenQuest);
  const totalSupply = useTotalSupply(QUEST_OBJECT_CONTRACT_ADDRESS, isOpenQuest);
  const { claimedList, claimPhi, refetch: refetchClaimedList } = useClaim(address, isOpenQuest);
  const { balances: balanceQuestObjects, refetch: refetchQuest } = useBalances(QUEST_OBJECT_CONTRACT_ADDRESS, address, isOpenWallet);
  const { balances: balanceFreeObjects, refetch: refetchFree } = useBalances(FREE_OBJECT_CONTRACT_ADDRESS, address, isOpenWallet);
  const { balances: balancePremiumObjects, refetch: refetchPre } = useBalances(PREMIUM_OBJECT_CONTRACT_ADDRESS, address, isOpenWallet);
  const { balances: balanceWallpapers, refetch: refetchWall } = useBalances(WALLPAPER_CONTRACT_ADDRESS, address, isOpenWallet || isEdit);
  const [depositObjects, { refetch: refetchDepositObjects, deposit, withdraw }] = useDeposit(currentENS, isOpenLand);
  const [landObjects, plus, minus, setLandObjects, tryWrite, tryRemove, reset] = useLand(depositObjects, isEdit);
  const { buyObjects } = useBuyObjects(address);
  const { save, tx: txSave } = useSave(currentENS);
  const refetchQuests = useCallback(() => (refetchQuest(), refetchClaimedList()), []);
  const refetchBalances = useCallback(() => (refetchQuest(), refetchFree(), refetchPre(), refetchWall(), refetchDepositObjects()), []);
  const refetchPhiland = useCallback(() => (refetchPhiObjects(), refetchWallpaper()), []);
  const phiObjectsWithLink = useMemo(() => {
    return Object.values(game.room.roomItemManager.getItems()).reduce((memo, item) => {
      const phiObject = item.getPhiObject();
      return phiObject.link.url ? [...memo, phiObject] : memo;
    }, [] as PhiObject[]);
  }, [isOpenLinkList]);

  const {
    onEdit,
    onView,
    onDropObject,
    onMoveObject,
    onPickLandObject,
    onRemoveObject,
    onChangeLink,
    onChangeWallpaper,
    onChangeScaled,
    onCheckDiff,
    onSave,
  } = useHandler({ phiObjects, wallpaper, uiHandler: { edit, view, tryRemove, changeLink, changeScaled, save } });
  const { initialized, isDiff } = useGame({
    state: { currentENS, isEdit, phiObjects, wallpaper },
    handler: { onCheckDiff },
    gameHandler: {
      onOpenActionMenu,
      onOpenWallpaperMenu,
      onChangeLinkMenu: changeLink,
      onPlaceFromLand: tryWrite,
      onChangeScaled: changeScaled,
      onPushRouter: (path: string) => router.push(path, undefined, { shallow: true }),
    },
  });

  return (
    <>
      <Help onOpenHowItWorks={onOpenHowItWorks} />
      <HowItWorks isOpen={isOpenHowItWorks} onOpen={onOpenHowItWorks} onClose={onCloseHowItWorks} />
      <QuickTour isEdit={isEdit} ens={currentENS} />
      <LinkList
        isOpen={isOpenLinkList}
        onOpen={onOpenLinkList}
        onClose={onCloseLinkList}
        phiObjects={phiObjectsWithLink}
        buttonPosition={{ bottom: "32px", right: isEdit ? "calc(24px + 48px + 16px)" : "calc(24px + (48px + 16px) * 2)" }}
        menuListStyle={{ w: "320px", m: "0 24px 0 0" }}
      />

      <MenuBar
        initialized={initialized}
        isDiff={isDiff}
        noObjectsInLand={depositObjects.length === 0 && phiObjects.length === 0}
        isEdit={isEdit}
        isOpen={{ wallet: isOpenWallet, land: isOpenLand }}
        currentENS={currentENS}
        domains={domains}
        currentWallpaper={wallpaper}
        // @ts-ignore
        balanceWallpapers={[...balanceWallpapers, ...balanceQuestObjects.filter((object) => isWallpaper(object.contract, object.tokenId))]}
        scaled={scaled}
        actionHandler={{
          onOpenWallet: onOpenWallet,
          onOpenLand: onOpenLand,
          onCloseLand,
          onSwitchCurrentENS: switchCurrentENS,
          onChangeWallpaper,
          onChangeScaled,
          onView,
          onEdit,
          onSave,
          onRefetch: () => (refetchPhiland(), updateEXP()),
        }}
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
        onRefetch={refetchBalances}
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
            //
            state={linkState[actionMenuState.id]}
            onClose={onCloseLinkMenu}
            onBack={onDropObject}
            onChange={onChangeLink}
          />
          <WallpaperMenu
            state={wallpaperMenuState}
            currentWallpaper={wallpaper}
            // @ts-ignore
            balanceWallpapers={[
              ...balanceWallpapers,
              ...balanceQuestObjects.filter((object) => isWallpaper(object.contract, object.tokenId)),
            ]}
            onClose={onCloseWallpaperMenu}
            onChangeWallpaper={onChangeWallpaper}
          />
          <EditStatus isDiff={isDiff} saveTx={txSave} />
        </>
      ) : (
        <>
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
            onRefetch={refetchQuests}
          />
          <Shop
            address={address}
            isOpen={isOpenShop}
            onClose={onCloseShop}
            onSubmit={buyObjects}
            onClickNavi={() => (onCloseModals(), onOpenWallet())}
            onRefetch={refetchBalances}
          />
          <Wallet
            items={[...balanceQuestObjects, ...balanceFreeObjects, ...balancePremiumObjects, ...balanceWallpapers]}
            isOpen={isOpenWallet}
            onClose={onCloseWallet}
            onSubmit={deposit}
            onClickNavi={() => (onCloseModals(), onEdit(), onOpenLand())}
            onRefetch={refetchBalances}
          />

          <MainMenu isOpenQuest={isOpenQuest} isOpenShop={isOpenShop} onOpenQuest={onOpenQuest} onOpenShop={onOpenShop} />
          <Share currentENS={currentENS} />
        </>
      )}
    </>
  );
};

export default Philand;
