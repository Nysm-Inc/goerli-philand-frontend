import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCallback, useContext, useEffect, useRef } from "react";
import { useAccount, useEnsName } from "wagmi";
import { Box, Center, Flex, HStack, useDisclosure, useBoolean, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Quest from "~/ui/features/quest";
import Inventory, { useInventory } from "~/ui/features/inventory";
import Collection, { useCollection } from "~/ui/features/collection";
import { ActionMenu, useActionMenu, Button, SelectBox, Search } from "~/ui/components";
import { useCreatePhiland } from "~/hooks/registry";
import useENS from "~/hooks/ens";
import { useDeposit, useSave, useViewPhiland } from "~/hooks/map";
import { useApproveAll, useBalances } from "~/hooks/object";
import { useClaim } from "~/hooks/claim";
import { PhiObject, IObject } from "~/types";
import { FRONTEND_URL } from "~/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Index: NextPage = () => {
  const loadGameRef = useRef(false); // for avoiding react18 strict mode
  const loadedGameRef = useRef(false);

  const router = useRouter();
  const { game } = useContext(AppContext);
  const { data: account } = useAccount();
  const { data: ens } = useEnsName({ address: account?.address });

  const [isEdit, { on: edit, off: view }] = useBoolean(false);
  const [actionMenuState, onOpenActionMenu, onCloseActionMenu] = useActionMenu();
  const { isOpen: isOpenQuest, onOpen: onOpenQuest, onClose: onCloseQuest } = useDisclosure();
  const { isOpen: isOpenCollection, onOpen: onOpenCollection, onClose: onCloseCollection } = useDisclosure();
  const { isOpen: isOpenInventory, onOpen: onOpenInventry, onClose: onCloseInventory } = useDisclosure();

  const [domains, currentENS, switchCurrentENS] = useENS(account?.address, ens);
  const [isCreated, isFetching, createPhiland] = useCreatePhiland(currentENS);
  const phiObjects = useViewPhiland(currentENS, isEdit); // error
  const [depositObjects, deposit, withdraw] = useDeposit(currentENS); // error
  const save = useSave(currentENS);
  const claimObject = useClaim(account?.address);
  const balanceObjects = useBalances(account?.address);
  const [isApproved, approveAllPhiPbject] = useApproveAll(account?.address);
  const [collectionItems, colPlus, colMinus] = useCollection(balanceObjects);
  const [inventoryItems, invPlus, invMinus, plusUsed, minusUsed, reset] = useInventory(depositObjects);

  const editMode = () => {
    game.room.edit();
    edit();
  };
  const viewMode = () => {
    game.room.view();
    game.room.leaveRoom();
    game.room.enterRoom();
    game.room.roomItemManager.loadItems(phiObjects);
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
    save(
      { removeIdxs: removeIdxs, remove_check: removeIdxs.length > 0 },
      writeArgs,
      writeArgs.map(() => {
        return { title: "", url: "" };
      })
    );
  };

  // todo: dependency hooks
  useEffect(() => {
    if (loadGameRef.current) return;
    loadGameRef.current = true;

    (async () => {
      await game.loadGame(onOpenActionMenu);
      loadedGameRef.current = true;
    })();
  }, []);
  useEffect(() => {
    if (!loadedGameRef.current) return;

    if (isCreated) {
      game.room.enterRoom();
    } else {
      game.room.leaveRoom();
    }
  }, [isCreated, loadedGameRef.current]);
  useEffect(() => {
    if (!loadedGameRef.current) return;

    game.room.leaveRoom();
    game.room.enterRoom();
    game.room.roomItemManager.loadItems(phiObjects);
  }, [phiObjects.length, loadedGameRef.current]);

  return (
    <>
      <>
        <HStack position="fixed" h="64px">
          <Box
            onClick={() => {
              game.room.leaveRoom();
              router.push("/explorer");
            }}
            cursor="pointer"
            pt="12px"
          >
            <Image src="/logo.png" width="64px" height="64px" />
          </Box>
          <Search />
        </HStack>
        <Flex position="fixed" right="0" mr="10px" h="64px" align="center">
          <ConnectButton />
        </Flex>
      </>

      <>
        <Quest isOpen={isOpenQuest} onClose={onCloseQuest} onClickItem={claimObject} />
        <Collection
          items={collectionItems}
          isApproved={isApproved}
          isOpen={isOpenCollection}
          onClose={onCloseCollection}
          onClickPlus={colPlus}
          onClickMinus={colMinus}
          onApprove={approveAllPhiPbject}
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
          onSubmit={withdraw}
        />

        <HStack position="fixed" bottom="0" left="calc(50% - 120px / 2)" spacing="16px" h="64px" align="center">
          <Button icon={<Image src="/icons/sword.svg" width="32px" height="32px" />} onClick={onOpenQuest} />
          <Button icon={<Image src="/icons/collection.svg" width="32px" height="32px" />} onClick={onOpenCollection} />
          <Button icon={<>🧰</>} onClick={onOpenInventry} />
        </HStack>
      </>

      {isCreated || phiObjects.length > 0 ? (
        <>
          <ActionMenu
            state={actionMenuState}
            onClose={onCloseActionMenu}
            onBack={onDropObject}
            onClickMove={onMoveObject}
            onClickLink={() => {}}
            onClickTrash={onRemoveObject}
          />

          <>
            <Flex position="fixed" bottom="0" ml="10px" h="64px" align="center">
              <Box w="144px" h="40px">
                <SelectBox
                  options={domains.map((domain) => {
                    return { label: domain, value: domain };
                  })}
                  value={currentENS}
                  disabled={!account}
                  handleChange={switchCurrentENS}
                />
              </Box>
            </Flex>
            <Flex
              position="fixed"
              bottom="0"
              right="0"
              mr="10px"
              w="calc(40px + 40px + 16px)"
              h="64px"
              align="center"
              justify="space-between"
            >
              <Center
                w="40px"
                h="40px"
                border="1px solid"
                borderColor="black"
                bgColor="white"
                cursor="pointer"
                onClick={isEdit ? viewMode : editMode}
              >
                <Image src={`/icons/${isEdit ? "arrow-back" : "pencil"}.svg`} width="32px" height="32px" />
              </Center>
              <Center
                w="40px"
                h="40px"
                border="1px solid"
                borderColor="black"
                bgColor="white"
                cursor="pointer"
                onClick={
                  isEdit
                    ? () => {
                        onSave();
                      }
                    : () => {
                        window.open(
                          `https://twitter.com/intent/tweet?text=Come visit my philand @phi_xyz%0a${FRONTEND_URL}/${currentENS}`,
                          "_blank"
                        );
                      }
                }
              >
                <Image src={`/icons/${isEdit ? "disk" : "upload"}.svg`} width="32px" height="32px" />
              </Center>
            </Flex>
          </>
        </>
      ) : (
        <>
          {account && !isFetching ? (
            <Box position="fixed" top="calc(50% - 40px)" left="calc(50% - 280px / 2)">
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
            <></>
          )}
        </>
      )}
    </>
  );
};

export default Index;
