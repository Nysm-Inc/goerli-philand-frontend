import type { NextPage } from "next";
import Image from "next/image";
import { FC } from "react";
import { chain as chains, useAccount, useEnsName, useNetwork } from "wagmi";
import { Box, useDisclosure, useBoolean, VStack, Text, Center } from "@chakra-ui/react";
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
  SelectBox,
  StatusTx,
  ConfirmTx,
  Header,
  Modal,
  ModalHeader,
  Button,
  ENSNotFound,
  Help,
  Permissions,
} from "~/ui/components";
import { useChangePhilandOwner, useCreatePhiland } from "~/hooks/registry";
import useENS from "~/hooks/ens";
import { useCheckWallpaper, useDeposit, useSave, useViewPhiland } from "~/hooks/map";
import { useApprove, useBalances } from "~/hooks/object";
import { useClaim, useClaimableList } from "~/hooks/claim";
import { useGame } from "~/hooks/game";
import { useGetFreeObject } from "~/hooks/free";
import { useBuyPremiumObject } from "~/hooks/premium";
import useWallpaper from "~/hooks/wallpaper";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  QUEST_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
  WALLPAPER_CONTRACT_ADDRESS,
} from "~/constants";
import { nullAddress, PhiLink } from "~/types";

const Mobile: FC = () => {
  return (
    <Modal w="320px" h="400px" isOpen={true} onClose={() => {}}>
      <ModalHeader buttons={[]} />
      <Center>
        <Text textStyle="headline" color="#FFFFFF">
          Mobile
        </Text>
      </Center>
    </Modal>
  );
};

const Index: NextPage = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data: dataENS } = useEnsName({ address });
  const ens = chain?.id === chains.polygonMumbai.id ? dataENS : "";

  const [isEdit, { on: edit, off: view }] = useBoolean(false);
  const [actionMenuState, onOpenActionMenu, onCloseActionMenu] = useActionMenu();
  const [linkState, onOpenLinkMenu, onCloseLinkMenu, changeLink] = useLinkMenu();
  const { isOpen: isOpenQuest, onOpen: onOpenQuest, onClose: onCloseQuest } = useDisclosure();
  const { isOpen: isOpenShop, onOpen: onOpenShop, onClose: onCloseShop } = useDisclosure();
  const { isOpen: isOpenCollection, onOpen: onOpenCollection, onClose: onCloseCollection } = useDisclosure();
  const { isOpen: isOpenInventory, onOpen: onOpenInventry, onClose: onCloseInventory } = useDisclosure();
  const { isOpen: isOpenPermissions, onOpen: onOpenPermissions, onClose: onClosePermissions } = useDisclosure();

  const [{ isLoading, domains }, currentENS, switchCurrentENS] = useENS(address, ens, chain?.id);
  const [isCreated, { createPhiland, tx: txCreatePhiland }] = useCreatePhiland(address, currentENS);
  const { changePhilandOwner, tx: txChangePhilandOwner } = useChangePhilandOwner(currentENS);
  const { owner, phiObjects } = useViewPhiland(currentENS);
  const isCreatedPhiland = owner === address && (isCreated || phiObjects.length > 0);
  const [wallpaper] = useCheckWallpaper(currentENS);
  const [isAprvPhi, { approve: aprvPhi, tx: txAprvPhi }] = useApprove(QUEST_OBJECT_CONTRACT_ADDRESS, address);
  const [isAprvFree, { approve: aprvFree, tx: txAprvFree }] = useApprove(FREE_OBJECT_CONTRACT_ADDRESS, address);
  const [isAprvPre, { approve: aprvPre, tx: txAprvPre }] = useApprove(PREMIUM_OBJECT_CONTRACT_ADDRESS, address);
  const [isAprvWall, { approve: aprvWall, tx: txAprvWall }] = useApprove(WALLPAPER_CONTRACT_ADDRESS, address);
  const [claimedList, { claimPhi, tx: txClaimPhi }] = useClaim(address);
  const { getFreeObject, tx: txGetFreeObject } = useGetFreeObject();
  const { buyPremiumObject, tx: txBuyPremiumObject } = useBuyPremiumObject();
  const { batchWallPaper, tx: txGetFreeWallpaper } = useWallpaper();
  const balancePhiObjects = useBalances(QUEST_OBJECT_CONTRACT_ADDRESS, address);
  const balanceFreeObjects = useBalances(FREE_OBJECT_CONTRACT_ADDRESS, address);
  const balancePremiumObjects = useBalances(PREMIUM_OBJECT_CONTRACT_ADDRESS, address);
  const balanceWallpapers = useBalances(WALLPAPER_CONTRACT_ADDRESS, address);
  const [depositObjects, { deposit, tx: txDeposit }, { withdraw, tx: txUndeposit }] = useDeposit(currentENS);
  const { save, tx: txSave } = useSave(currentENS);
  const [claimableList, updateClaimableList] = useClaimableList(address);
  const [inventoryObjects, plus, minus, tryWrite, tryRemove, reset] = useInventory(depositObjects, isEdit);

  const {
    initialized,
    handler: { onEdit, onView, onDropObject, onMoveObject, onPickInventoryObject, onRemoveObject, onChangeLink, onChangeWallpaper, onSave },
  } = useGame({
    state: { currentENS, isEdit, isCreatedPhiland, phiObjects, wallpaper },
    uiHandler: { edit, view, tryWrite, tryRemove, changeLink, save },
    // todo: onOpenWallpaperMenu
    gameUIHandler: { onOpenActionMenu, onChangeLinkMenu: changeLink },
  });

  // todo: use breakpoints
  if (window.matchMedia("(any-pointer:coarse)").matches) {
    return <Mobile />;
  }
  return (
    <>
      <ConfirmTx
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
      <StatusTx
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
        isOpen={isOpenQuest}
        onClose={onCloseQuest}
        onClickItem={claimPhi}
        onClickUpdate={updateClaimableList}
      />
      <Shop
        //
        isOpen={isOpenShop}
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
        onOpenPermissions={onOpenPermissions}
        onClose={onCloseCollection}
        onSubmit={deposit}
      />
      <Inventory
        objects={inventoryObjects}
        isEdit={isEdit}
        isOpen={isOpenInventory}
        onClose={onCloseInventory}
        onClickPlus={plus}
        onClickMinus={minus}
        onClickObject={onPickInventoryObject}
        onSubmit={withdraw}
        reset={reset}
      />
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
      <Header />
      <Help />

      {isCreatedPhiland ? (
        <MenuBar
          initialized={initialized}
          isEdit={isEdit}
          currentENS={currentENS}
          domains={domains}
          isApprovedWallpaper={isAprvWall}
          currentWallpaper={wallpaper}
          balanceWallpapers={balanceWallpapers}
          actionHandler={{
            onOpenQuest,
            onOpenShop,
            onOpenCollection,
            onOpenInventry,
            onSwitchCurrentENS: switchCurrentENS,
            onChangeWallpaper,
            onView,
            onEdit,
            onSave,
          }}
          isOpen={{ quest: isOpenQuest, shop: isOpenShop, collection: isOpenCollection, inventory: isOpenInventory }}
        />
      ) : (
        <>
          {domains.length > 0 ? (
            <Modal w="456px" h="438px" isOpen={true} onClose={() => {}} overlay>
              <ModalHeader buttons={[]} />
              <VStack spacing="8px">
                <Image src="/icons/ens.svg" width="134px" height="150px" />
                <Box h="16px" />
                <SelectBox
                  w="360px"
                  options={domains.map((domain) => {
                    return { label: domain, value: domain };
                  })}
                  selected={{ label: currentENS, value: currentENS }}
                  handleChange={switchCurrentENS}
                />
                <Button
                  w="360px"
                  color="purple"
                  onClick={owner === nullAddress ? createPhiland : changePhilandOwner}
                  disabled={isCreatedPhiland}
                >
                  <Text color="white" textStyle="button-1">
                    {owner === nullAddress ? "CREATE LAND" : "CHANGE OWNER"}
                  </Text>
                </Button>
              </VStack>
            </Modal>
          ) : (
            <>
              {address ? (
                <Box position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
                  {isLoading ? (
                    <>
                      {/* todo */}
                      {/* <>Loaindg Splash...</> */}
                    </>
                  ) : (
                    <ENSNotFound />
                  )}
                </Box>
              ) : (
                <Box position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
                  <Image src="https://www.arweave.net/ygPahoFDTsqYyL0Ddvy3xiuS0x1_jYVvB7p_1TSTcyk?ext=png" width="128px" height="128px" />
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
