import type { NextPage } from "next";
import Image from "next/image";
import { chain, useAccount, useEnsName, useNetwork, useProvider } from "wagmi";
import { Box, Center, useDisclosure, useBoolean, VStack } from "@chakra-ui/react";
import Quest from "~/ui/features/quest";
import Shop from "~/ui/features/shop";
import Inventory, { useInventory } from "~/ui/features/inventory";
import Collection from "~/ui/features/collection";
import { ActionMenu, useActionMenu, LinkMenu, useLinkMenu, MenuBar, SelectBox, StatusTx, ConfirmTx, Header } from "~/ui/components";
import { useCreatePhiland } from "~/hooks/registry";
import useENS from "~/hooks/ens";
import { useDeposit, useSave, useViewPhiland } from "~/hooks/map";
import { useApprove, useBalances } from "~/hooks/object";
import { useClaim, useClaimableList } from "~/hooks/claim";
import { useGame } from "~/hooks/game";
import { useGetFreeObject } from "~/hooks/free";
import { useBuyPremiumObject } from "~/hooks/premium";
import { FREE_OBJECT_CONTRACT_ADDRESS, PHI_OBJECT_CONTRACT_ADDRESS, PREMIUM_OBJECT_CONTRACT_ADDRESS } from "~/constants";
import { PhiLink } from "~/types";

const Index: NextPage = () => {
  const { activeChain } = useNetwork();
  const { data: account } = useAccount();
  const { data: dataENS } = useEnsName({ address: account?.address });
  const provider = useProvider();
  const ens = activeChain?.id === chain.goerli.id ? dataENS : "";

  const [isEdit, { on: edit, off: view }] = useBoolean(false);
  const [actionMenuState, onOpenActionMenu, onCloseActionMenu] = useActionMenu();
  const [linkState, onOpenLinkMenu, onCloseLinkMenu, changeLink] = useLinkMenu();
  const { isOpen: isOpenQuest, onOpen: onOpenQuest, onClose: onCloseQuest } = useDisclosure();
  const { isOpen: isOpenShop, onOpen: onOpenShop, onClose: onCloseShop } = useDisclosure();
  const { isOpen: isOpenCollection, onOpen: onOpenCollection, onClose: onCloseCollection } = useDisclosure();
  const { isOpen: isOpenInventory, onOpen: onOpenInventry, onClose: onCloseInventory } = useDisclosure();

  const [{ isLoading, domains }, currentENS, switchCurrentENS] = useENS(account?.address, ens, activeChain?.id);
  const [isCreated, { createPhiland, tx: txCreatePhiland }] = useCreatePhiland(currentENS);
  const phiObjects = useViewPhiland(currentENS);
  const isCreatedPhiland = isCreated || phiObjects.length > 0;
  const [isAprvPhi, { approve: aprvPhi, tx: txAprvPhi }] = useApprove(PHI_OBJECT_CONTRACT_ADDRESS, account?.address);
  const [isAprvFree, { approve: aprvFree, tx: txAprvFree }] = useApprove(FREE_OBJECT_CONTRACT_ADDRESS, account?.address);
  const [isAprvPre, { approve: aprvPre, tx: txAprvPre }] = useApprove(PREMIUM_OBJECT_CONTRACT_ADDRESS, account?.address);
  const { claimPhi, tx: txClaimPhi } = useClaim(account?.address);
  const { getFreeObject, tx: txGetFreeObject } = useGetFreeObject();
  const { buyPremiumObject, tx: txBuyPremiumObject } = useBuyPremiumObject(provider);
  const balancePhiObjects = useBalances(PHI_OBJECT_CONTRACT_ADDRESS, account?.address);
  const balanceFreeObjects = useBalances(FREE_OBJECT_CONTRACT_ADDRESS, account?.address);
  const balancePremiumObjects = useBalances(PREMIUM_OBJECT_CONTRACT_ADDRESS, account?.address);
  const [depositObjects, { deposit, tx: txDeposit }, { undeposit, tx: txUndeposit }] = useDeposit(currentENS);
  const { save, tx: txSave } = useSave(currentENS);
  const [claimableList, refetchClaimableList] = useClaimableList(account?.address);
  const [inventoryItems, plus, minus, tryWrite, tryRemove, reset] = useInventory(depositObjects, isEdit);

  const { onEdit, onView, onDropObject, onMoveObject, onPickInventoryObject, onRemoveObject, onChangeLink, onSave } = useGame({
    state: { isEdit, isCreatedPhiland, phiObjects },
    uiHandler: { edit, view, tryWrite, tryRemove, changeLink, save },
    gameUIHandler: { onOpenActionMenu, onChangeLinkMenu: changeLink },
  });

  return (
    <>
      <ConfirmTx
        txs={[
          txCreatePhiland,
          txAprvPhi,
          txAprvFree,
          txAprvPre,
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
          txAprvPre,
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
        // todo: new method
        claimedList={balancePhiObjects}
        isOpen={isOpenQuest}
        onClose={onCloseQuest}
        onClickItem={claimPhi}
        onClickRefetch={refetchClaimableList}
      />
      <Shop
        //
        isOpen={isOpenShop}
        onClose={onCloseShop}
        onClickFreeItem={getFreeObject}
        onClickPremiumItem={buyPremiumObject}
      />
      <Collection
        items={[...balancePhiObjects, ...balanceFreeObjects, ...balancePremiumObjects]}
        isApproved={{
          [PHI_OBJECT_CONTRACT_ADDRESS]: isAprvPhi,
          [FREE_OBJECT_CONTRACT_ADDRESS]: isAprvFree,
          [PREMIUM_OBJECT_CONTRACT_ADDRESS]: isAprvPre,
        }}
        isEdit={isEdit}
        isOpen={isOpenCollection}
        onClose={onCloseCollection}
        onApprove={{
          [PHI_OBJECT_CONTRACT_ADDRESS]: aprvPhi,
          [FREE_OBJECT_CONTRACT_ADDRESS]: aprvFree,
          [PREMIUM_OBJECT_CONTRACT_ADDRESS]: aprvPre,
        }}
        onSubmit={deposit}
      />
      <Inventory
        items={inventoryItems}
        isEdit={isEdit}
        isOpen={isOpenInventory}
        onClose={onCloseInventory}
        onClickPlus={plus}
        onClickMinus={minus}
        onClickItem={onPickInventoryObject}
        onSubmit={undeposit}
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
      <Header />

      {isCreatedPhiland ? (
        <MenuBar
          isEdit={isEdit}
          account={account?.address}
          currentENS={currentENS}
          domains={domains}
          actionHandler={{
            onOpenQuest,
            onOpenShop,
            onOpenCollection,
            onOpenInventry,
            switchCurrentENS,
            onView,
            onEdit,
            onSave,
          }}
          isOpen={{ quest: isOpenQuest, shop: isOpenShop, collection: isOpenCollection, inventory: isOpenInventory }}
        />
      ) : (
        <>
          {domains.length > 0 ? (
            <Box position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)">
              <VStack>
                <SelectBox
                  w="280px"
                  options={domains.map((domain) => {
                    return { label: domain, value: domain };
                  })}
                  value={currentENS}
                  handleChange={switchCurrentENS}
                />

                <Center w="280px" h="40px" border="1px solid" borderColor="black" cursor="pointer" onClick={createPhiland}>
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
