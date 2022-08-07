import Image from "next/image";
import { FC } from "react";
import { useAccount, useEnsName, useNetwork } from "wagmi";
import { Box, useDisclosure, useBoolean } from "@chakra-ui/react";
import Quest from "~/ui/features/quest";
import Shop from "~/ui/features/shop";
import Land, { useLand } from "~/ui/features/land";
import Wallet from "~/ui/features/wallet";
import {
  ActionMenu,
  useActionMenu,
  LinkMenu,
  useLinkMenu,
  MenuBar,
  ConfirmModal,
  StatusToast,
  Header,
  ENSNotFound,
  Help,
  CreatePhiland,
  Share,
  MainMenu,
  HowItWorks,
  WallpaperMenu,
  useWallpaperMenu,
  QuickTour,
} from "~/ui/components";
import { useChangePhilandOwner, useCreatePhiland } from "~/hooks/registry";
import useENS from "~/hooks/ens";
import { useWallpaper, useDeposit, useSave, useViewPhiland } from "~/hooks/map";
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
import { PhiLink } from "~/types";

const Main: FC = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data: dataENS } = useEnsName({ address });
  const ens = !chain?.unsupported ? dataENS : "";

  const [isEdit, { on: edit, off: view }] = useBoolean(false);
  const [actionMenuState, onOpenActionMenu, onCloseActionMenu] = useActionMenu();
  const [linkState, onOpenLinkMenu, onCloseLinkMenu, changeLink] = useLinkMenu();
  const [wallpaperMenuState, onOpenWallpaperMenu, onCloseWallpaperMenu] = useWallpaperMenu();
  const { isOpen: isOpenQuest, onOpen: onOpenQuest, onClose: onCloseQuest } = useDisclosure();
  const { isOpen: isOpenShop, onOpen: onOpenShop, onClose: onCloseShop } = useDisclosure();
  const { isOpen: isOpenWallet, onOpen: onOpenWallet, onClose: onCloseWallet } = useDisclosure();
  const { isOpen: isOpenLand, onOpen: onOpenLand, onClose: onCloseLand } = useDisclosure();
  const { isOpen: isOpenHowItWorks, onOpen: onOpenHowItWorks, onClose: onCloseHowItWorks } = useDisclosure();

  const [{ isLoading, domains }, currentENS, switchCurrentENS] = useENS(address, ens, chain?.unsupported);
  const [{ isCreated }, { createPhiland }] = useCreatePhiland(address, currentENS);
  const { changePhilandOwner } = useChangePhilandOwner(address, currentENS);
  const { owner, phiObjects } = useViewPhiland(currentENS);
  const isCreatedPhiland = owner === address && (isCreated || phiObjects.length > 0);

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
    handler: { onEdit, onView, onDropObject, onMoveObject, onPickLandObject, onRemoveObject, onChangeLink, onChangeWallpaper, onSave },
  } = useGame({
    state: { currentENS, isEdit, isCreatedPhiland, phiObjects, wallpaper },
    uiHandler: { edit, view, tryWrite, tryRemove, changeLink, save },
    gameUIHandler: { onOpenActionMenu, onOpenWallpaperMenu, onChangeLinkMenu: changeLink },
  });

  return (
    <>
      <Header />
      <Help onOpenHowItWorks={onOpenHowItWorks} />

      {currentENS && (
        <>
          <ConfirmModal />
          <StatusToast />
        </>
      )}

      {isCreatedPhiland ? (
        <>
          <HowItWorks isOpen={isOpenHowItWorks} onOpen={onOpenHowItWorks} onClose={onCloseHowItWorks} />
          <QuickTour />

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
      ) : (
        <>
          {domains.length > 0 ? (
            <CreatePhiland
              owner={owner}
              currentENS={currentENS}
              domains={domains}
              isCreatedPhiland={isCreatedPhiland}
              switchCurrentENS={switchCurrentENS}
              createPhiland={createPhiland}
              changePhilandOwner={changePhilandOwner}
            />
          ) : (
            <>
              {address ? (
                <Box zIndex="default" position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
                  {isLoading ? <>{!initialized && <>{/* todo: Splash */}</>}</> : <ENSNotFound />}
                </Box>
              ) : (
                <Box zIndex="default" position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
                  <Image src="/icons/ENShold.png" width="96px" height="96px" />
                </Box>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Main;
