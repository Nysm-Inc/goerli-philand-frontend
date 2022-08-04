import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FC, useContext, useEffect } from "react";
import { useAccount, useEnsName, useNetwork } from "wagmi";
import { Box, useDisclosure, useBoolean, useBreakpointValue } from "@chakra-ui/react";
import { useInventory } from "~/ui/features/inventory";
import {
  useActionMenu,
  useLinkMenu,
  MenuBar,
  Header,
  Help,
  Share,
  Dev,
  MainMenu,
  Mobile,
  WallpaperMenu,
  useWallpaperMenu,
} from "~/ui/components";
import { useChangePhilandOwner, useCreatePhiland } from "~/hooks/registry";
import useENS from "~/hooks/ens";
import { useWallpaper, useDeposit, useSave, useViewPhiland } from "~/hooks/map";
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
import { PhiLink } from "~/types";
import { AppContext } from "~/contexts";

const ActionMenu = dynamic(() => import("~/ui/components/ActionMenu"));
const LinkMenu = dynamic(() => import("~/ui/components/LinkMenu"));
const ConfirmModal = dynamic(() => import("~/ui/components/transaction/ConfirmModal"));
const StatusToast = dynamic(() => import("~/ui/components/transaction/StatusToast"));
const ENSNotFound = dynamic(() => import("~/ui/components/ENSNotFound"));
const Permissions = dynamic(() => import("~/ui/components/Permissions"));
const CreatePhiland = dynamic(() => import("~/ui/components/CreatePhiland"));
const HowItWorks = dynamic(() => import("~/ui/components/HowItWorks"));
const Inventory = dynamic(() => import("~/ui/features/inventory"));
const Collection = dynamic(() => import("~/ui/features/collection"));
const Quest = dynamic(() => import("~/ui/features/quest"));
const Shop = dynamic(() => import("~/ui/features/shop"));

const Index: NextPage = () => {
  const { game } = useContext(AppContext);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    if (isMobile) {
      game.engine.hideClouds();
      game.engine.hide();
    } else {
      game.engine.showClouds();
      game.engine.show();
    }
  }, [isMobile]);

  return (
    <>
      <Dev />
      {isMobile ? <Mobile /> : <PC />}
    </>
  );
};

const PC: FC = () => {
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
  const { isOpen: isOpenCollection, onOpen: onOpenCollection, onClose: onCloseCollection } = useDisclosure();
  const { isOpen: isOpenInventory, onOpen: onOpenInventry, onClose: onCloseInventory } = useDisclosure();
  const { isOpen: isOpenPermissions, onOpen: onOpenPermissions, onClose: onClosePermissions } = useDisclosure();
  const { isOpen: isOpenHowItWorks, onOpen: onOpenHowItWorks, onClose: onCloseHowItWorks } = useDisclosure();

  const [{ isLoading, domains }, currentENS, switchCurrentENS] = useENS(address, ens, chain?.unsupported);
  const [{ isCreated }, { createPhiland, tx: txCreatePhiland }] = useCreatePhiland(address, currentENS);
  const { changePhilandOwner, tx: txChangePhilandOwner } = useChangePhilandOwner(address, currentENS);
  const { owner, phiObjects } = useViewPhiland(currentENS);
  const isCreatedPhiland = owner === address && (isCreated || phiObjects.length > 0);
  const wallpaper = useWallpaper(currentENS);
  const [isAprvPhi, { approve: aprvPhi, tx: txAprvPhi }] = useApprove(QUEST_OBJECT_CONTRACT_ADDRESS, address);
  const [isAprvFree, { approve: aprvFree, tx: txAprvFree }] = useApprove(FREE_OBJECT_CONTRACT_ADDRESS, address);
  const [isAprvPre, { approve: aprvPre, tx: txAprvPre }] = useApprove(PREMIUM_OBJECT_CONTRACT_ADDRESS, address);
  const [isAprvWall, { approve: aprvWall, tx: txAprvWall }] = useApprove(WALLPAPER_CONTRACT_ADDRESS, address);
  const [claimedList, { claimPhi, tx: txClaimPhi }] = useClaim(address);
  const totalSupply = useTotalSupply(QUEST_OBJECT_CONTRACT_ADDRESS);
  const { getFreeObject, tx: txGetFreeObject } = useGetFreeObject();
  const { buyPremiumObject, tx: txBuyPremiumObject } = useBuyPremiumObject();
  const { batchWallPaper, tx: txGetFreeWallpaper } = useGetWallpaper();
  const balancePhiObjects = useBalances(QUEST_OBJECT_CONTRACT_ADDRESS, address);
  const balanceFreeObjects = useBalances(FREE_OBJECT_CONTRACT_ADDRESS, address);
  const balancePremiumObjects = useBalances(PREMIUM_OBJECT_CONTRACT_ADDRESS, address);
  const balanceWallpapers = useBalances(WALLPAPER_CONTRACT_ADDRESS, address);
  const [depositObjects, { deposit, tx: txDeposit }, { withdraw, tx: txUndeposit }] = useDeposit(currentENS);
  const { save, tx: txSave } = useSave(currentENS);
  const [claimableList, updateClaimableList] = useClaimableList(address);
  const [inventoryObjects, plus, minus, tryWrite, tryRemove, reset] = useInventory(depositObjects, isEdit);

  const {
    state: { initialized },
    handler: { onEdit, onView, onDropObject, onMoveObject, onPickInventoryObject, onRemoveObject, onChangeLink, onChangeWallpaper, onSave },
  } = useGame({
    state: { currentENS, isEdit, isCreatedPhiland, phiObjects, wallpaper },
    uiHandler: { edit, view, tryWrite, tryRemove, changeLink, save },
    gameUIHandler: { onOpenActionMenu, onOpenWallpaperMenu, onChangeLinkMenu: changeLink },
  });

  return (
    <>
      <ConfirmModal
        txs={[
          txCreatePhiland,
          txChangePhilandOwner,
          txAprvPhi,
          txAprvFree,
          txAprvPre,
          txAprvWall,
          txClaimPhi,
          txBuyPremiumObject,
          txGetFreeObject,
          txGetFreeWallpaper,
          txDeposit,
          txUndeposit,
          txSave,
        ]}
      />
      <StatusToast
        txs={[
          txCreatePhiland,
          txChangePhilandOwner,
          txAprvPhi,
          txAprvFree,
          txAprvPre,
          txAprvWall,
          txClaimPhi,
          txBuyPremiumObject,
          txGetFreeObject,
          txGetFreeWallpaper,
          txDeposit,
          txUndeposit,
          txSave,
        ]}
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
      {isEdit && (
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
      )}
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
      <HowItWorks isCreatedPhiland={isCreatedPhiland} isOpen={isOpenHowItWorks} onOpen={onOpenHowItWorks} onClose={onCloseHowItWorks} />
      <Header onOpenPermissions={onOpenPermissions} />
      {!isEdit && <MainMenu isOpenQuest={isOpenQuest} isOpenShop={isOpenShop} onOpenQuest={onOpenQuest} onOpenShop={onOpenShop} />}
      {!isEdit && <Share currentENS={currentENS} />}
      <Help onOpenHowItWorks={onOpenHowItWorks} />

      {isCreatedPhiland ? (
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
                  <Image src="/icons/ENShold.svg" width="96px" height="96px" quality={100} />
                </Box>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Index;
