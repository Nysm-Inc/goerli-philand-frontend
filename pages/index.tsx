import type { NextPage } from "next";
import Image from "next/image";
import { chain, useAccount, useEnsName, useNetwork, useProvider } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Box, Center, useDisclosure, useBoolean, VStack } from "@chakra-ui/react";
import Quest from "~/ui/features/quest";
import Shop from "~/ui/features/shop";
import Inventory, { useInventory } from "~/ui/features/inventory";
import Collection, { useCollection } from "~/ui/features/collection";
import { ActionMenu, useActionMenu, MenuBar, SelectBox, Search, StatusTx, ConfirmTx } from "~/ui/components";
import { useCreatePhiland } from "~/hooks/registry";
import useENS from "~/hooks/ens";
import { useDeposit, useSave, useViewPhiland } from "~/hooks/map";
import { useApproveAll, useBalances } from "~/hooks/object";
import { useClaim, useClaimableList } from "~/hooks/claim";
import { useGame } from "~/hooks/game";
import { useGetFreeObject } from "~/hooks/free";
import { useBuyPremiumObject } from "~/hooks/premium";
import { PhiObject, IObject } from "~/types";
import {
  FREE_OBJECT_CONTRACT_ADDRESS,
  PHI_OBJECT_CONTRACT_ADDRESS,
  PREMIUM_OBJECT_CONTRACT_ADDRESS,
} from "~/constants";

const Index: NextPage = () => {
  const { activeChain } = useNetwork();
  const { data: account } = useAccount();
  const { data: dataENS } = useEnsName({ address: account?.address });
  const provider = useProvider();
  const ens = activeChain?.id === chain.goerli.id ? dataENS : "";

  const [isEdit, { on: edit, off: view }] = useBoolean(false);
  const [actionMenuState, onOpenActionMenu, onCloseActionMenu] = useActionMenu();
  const { isOpen: isOpenQuest, onOpen: onOpenQuest, onClose: onCloseQuest } = useDisclosure();
  const { isOpen: isOpenShop, onOpen: onOpenShop, onClose: onCloseShop } = useDisclosure();
  const { isOpen: isOpenCollection, onOpen: onOpenCollection, onClose: onCloseCollection } = useDisclosure();
  const { isOpen: isOpenInventory, onOpen: onOpenInventry, onClose: onCloseInventory } = useDisclosure();

  const [{ isLoading, domains }, currentENS, switchCurrentENS] = useENS(account?.address, ens, activeChain?.id);
  const [isCreated, { createPhiland, tx: txCreatePhiland }] = useCreatePhiland(currentENS);
  const phiObjects = useViewPhiland(currentENS, isEdit);
  const [depositObjects, { deposit, tx: txDeposit }, { undeposit, tx: txUndeposit }] = useDeposit(currentENS);
  const { save, tx: txSave } = useSave(currentENS);
  const { claimPhi, tx: txClaimPhi } = useClaim(account?.address);
  const { getFreeObject, tx: txGetFreeObject } = useGetFreeObject();
  const { buyPremiumObject, tx: txBuyPremiumObject } = useBuyPremiumObject(provider);
  const balancePhiObjects = useBalances(PHI_OBJECT_CONTRACT_ADDRESS, account?.address);
  const balanceFreeObjects = useBalances(FREE_OBJECT_CONTRACT_ADDRESS, account?.address);
  const balancePremiumObjects = useBalances(PREMIUM_OBJECT_CONTRACT_ADDRESS, account?.address);
  const [isApprovedPhi, { approve: aprvPhi, tx: txAprvPhi }] = useApproveAll(
    PHI_OBJECT_CONTRACT_ADDRESS,
    account?.address
  );
  const [isApprovedFree, { approve: aprvFree, tx: txAprvFree }] = useApproveAll(
    FREE_OBJECT_CONTRACT_ADDRESS,
    account?.address
  );
  const [isApprovedPremium, { approve: aprvPremium, tx: txAprvPremium }] = useApproveAll(
    PREMIUM_OBJECT_CONTRACT_ADDRESS,
    account?.address
  );
  const [collectionItems, colPlus, colMinus] = useCollection([
    ...balancePhiObjects,
    ...balanceFreeObjects,
    ...balancePremiumObjects,
  ]);
  const [inventoryItems, invPlus, invMinus, plusUsed, minusUsed, reset] = useInventory(depositObjects);
  const [claimableList, refetchClaimableList] = useClaimableList(account?.address);
  const isCreatedPhiland = isCreated || phiObjects.length > 0;

  const game = useGame(isCreatedPhiland, phiObjects, { onOpenActionMenu });

  const editMode = () => {
    if (isEdit) return;

    game.room.edit();
    edit();
  };
  const viewMode = () => {
    if (!isEdit) return;

    game.room.leaveRoom();
    game.room.enterRoom();
    game.room.roomItemManager.loadItems(phiObjects);
    game.room.view();
    view();
    reset();
  };
  const onDropObject = () => {
    game.room.movingItemManager.drop();
  };
  const onMoveObject = () => {
    game.room.movingItemManager.move();
  };
  const onRemoveObject = () => {
    const roomItems = game.room.roomItemManager.getItems();
    const item = roomItems[actionMenuState.id];
    game.room.roomItemManager.removeItem(item.getUUID());
    const object = item.getObject();
    minusUsed(object.contractAddress, object.tokenId);
  };
  const onPickFromInventory = (object: IObject) => {
    game.room.movingItemManager.pickFromInventory(object);
    plusUsed(object.contractAddress, object.tokenId);
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

    // todo: const diff = useMemo(() => {}, [])
    save({
      removeArgs: { removeIdxs: removeIdxs, remove_check: removeIdxs.length > 0 },
      writeArgs,
      linkArgs: writeArgs.map(() => {
        return { title: "", url: "" };
      }),
    });
  };

  return (
    <>
      <ConfirmTx
        txs={[
          txCreatePhiland,
          txAprvPhi,
          txAprvFree,
          txAprvPremium,
          txClaimPhi,
          txBuyPremiumObject,
          txGetFreeObject,
          txDeposit,
          txUndeposit,
          txSave,
        ]}
      />
      <StatusTx
        txs={[
          txCreatePhiland,
          txAprvPhi,
          txAprvFree,
          txAprvPremium,
          txClaimPhi,
          txBuyPremiumObject,
          txGetFreeObject,
          txDeposit,
          txUndeposit,
          txSave,
        ]}
      />
      <Quest
        claimableList={claimableList}
        isOpen={isOpenQuest}
        onClose={onCloseQuest}
        onClickItem={claimPhi}
        onClickRefetch={refetchClaimableList}
      />
      <Shop
        isOpen={isOpenShop}
        onClose={onCloseShop}
        onClickFreeItem={getFreeObject}
        onClickPremiumItem={buyPremiumObject}
      />
      <Collection
        items={collectionItems}
        isApproved={{ phi: isApprovedPhi, free: isApprovedFree, premium: isApprovedPremium }}
        isOpen={isOpenCollection}
        onClose={onCloseCollection}
        onClickPlus={colPlus}
        onClickMinus={colMinus}
        onApprove={{ phi: aprvPhi, free: aprvFree, premium: aprvPremium }}
        onSubmit={deposit}
      />
      <Inventory
        items={inventoryItems}
        isOpen={isOpenInventory}
        readonly={!isEdit}
        onClose={onCloseInventory}
        onClickPlus={invPlus}
        onClickMinus={invMinus}
        onClickItem={onPickFromInventory}
        onSubmit={undeposit}
      />
      <ActionMenu
        state={actionMenuState}
        onClose={onCloseActionMenu}
        onBack={onDropObject}
        onClickMove={onMoveObject}
        onClickLink={() => {}}
        onClickTrash={onRemoveObject}
      />
      <MenuBar
        isEdit={isEdit}
        account={account?.address}
        currentENS={currentENS}
        isCreatedPhiland={isCreatedPhiland}
        domains={domains}
        phiObjects={phiObjects}
        actionHandler={{
          onOpenQuest,
          onOpenShop,
          onOpenCollection,
          onOpenInventry,
          switchCurrentENS,
          viewMode,
          editMode,
          onSave,
        }}
      />

      <Box
        position="fixed"
        top="16px"
        left="24px"
        cursor="pointer"
        onClick={() => {
          window.location.href = "/explorer"; // todo: redirect to LP
        }}
      >
        <Image src="/logo.png" width="64px" height="64px" />
      </Box>
      <Box position="fixed" top="24px" left="calc(24px + 64px + 24px)">
        <Search />
      </Box>
      <Box position="fixed" top="24px" right="24px">
        <ConnectButton />
      </Box>

      {!isCreatedPhiland && (
        <>
          {domains.length > 0 ? (
            <Box position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
              <VStack>
                <Box w="280px" h="40px">
                  <SelectBox
                    options={domains.map((domain) => {
                      return { label: domain, value: domain };
                    })}
                    value={currentENS}
                    disabled={!account}
                    handleChange={switchCurrentENS}
                  />
                </Box>
                <Center
                  w="280px"
                  h="40px"
                  border="1px solid"
                  borderColor="black"
                  cursor="pointer"
                  onClick={createPhiland}
                >
                  Create Philand
                </Center>
              </VStack>
            </Box>
          ) : (
            <>
              {account ? (
                <Box position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
                  {isLoading ? (
                    <>
                      {/* todo */}
                      {/* <>Loaindg Splash...</> */}
                    </>
                  ) : (
                    <>
                      <>ENS NOT FOUND</>
                    </>
                  )}
                </Box>
              ) : (
                <Box position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
                  <Image
                    src="https://www.arweave.net/ygPahoFDTsqYyL0Ddvy3xiuS0x1_jYVvB7p_1TSTcyk?ext=png"
                    width="128px"
                    height="128px"
                  />
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
