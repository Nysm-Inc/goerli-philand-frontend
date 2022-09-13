import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useContext, useEffect } from "react";
import { Box, Center, useBoolean, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { FREE_OBJECT_CONTRACT_ADDRESS, WALLPAPER_CONTRACT_ADDRESS } from "~/constants";
import { AppContext } from "~/contexts";
import { PhiObject, BalanceObject, DepositObject, ObjectContractAddress, WallpaperContractAddress } from "~/types";
import { objectMetadataList } from "~/types/object";
import useGame from "~/hooks/game/useGame";
import useClouds from "~/hooks/game/useClouds";
import useHandler from "~/hooks/game/useHandler";
import { useLand } from "~/ui/features/land/useLand";
import Land from "~/ui/features/land";
import Help from "~/ui/components/Help";
import MenuBar from "~/ui/components/MenuBar";
import { useZoom } from "~/ui/components/Zoom";
import ActionMenu, { useActionMenu } from "~/ui/components/ActionMenu";
import LinkMenu, { useLinkMenu } from "~/ui/components/LinkMenu";
import WallpaperMenu, { useWallpaperMenu } from "~/ui/components/WallpaperMenu";
import Icon from "~/ui/components/Icon";
import IconButton from "~/ui/components/common/IconButton";

const depositObjects: DepositObject[] = [];
(Object.keys(objectMetadataList) as (ObjectContractAddress | WallpaperContractAddress)[]).forEach((contract) => {
  if (contract === WALLPAPER_CONTRACT_ADDRESS) return;
  Object.values(objectMetadataList[contract]).forEach((meta) => {
    if (contract === FREE_OBJECT_CONTRACT_ADDRESS && meta.tokenId === 36) return;
    depositObjects.push({ contractAddress: contract, tokenId: meta.tokenId, amount: 1, used: 0 });
  });
});

const balanceWallpapers: BalanceObject[] = Object.values(objectMetadataList[WALLPAPER_CONTRACT_ADDRESS]).map((meta) => ({
  contract: WALLPAPER_CONTRACT_ADDRESS,
  tokenId: meta.tokenId,
  amount: 1,
}));

const phiObjects: (PhiObject & { removeIdx: number })[] = [
  {
    contractAddress: FREE_OBJECT_CONTRACT_ADDRESS,
    tokenId: 36,
    xStart: 3,
    yStart: 3,
    xEnd: 4,
    yEnd: 4,
    link: { title: "", url: "" },
    removeIdx: 0,
  },
];

const Header: FC = () => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useContext(AppContext);

  return (
    <>
      <Box
        zIndex="default"
        position="fixed"
        top="16px"
        left="24px"
        cursor="pointer"
        onClick={() => router.push("/", undefined, { shallow: true })}
      >
        <Image src="/icons/logo.svg" width="64px" height="64px" alt="" />
      </Box>
      <Box zIndex="default" position="fixed" top="24px" right="24px">
        <IconButton
          ariaLabel="color_mode"
          icon={
            <Center h="100%" w="100%">
              {colorMode === "light" ? (
                <Center h="32px" w="32px" bgColor="grey.900" borderRadius="6px">
                  <Icon name="moon" color="white" />
                </Center>
              ) : (
                <Center w="32px" h="32px" bgColor="white" borderRadius="6px">
                  <Icon name="sun" />
                </Center>
              )}
            </Center>
          }
          onClick={toggleColorMode}
        />
      </Box>
    </>
  );
};

const Index: NextPage = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false }, { ssr: false });
  const [isEdit, { on: edit, off: view }] = useBoolean(false);
  const [actionMenuState, onOpenActionMenu, onCloseActionMenu] = useActionMenu();
  const [linkState, onOpenLinkMenu, onCloseLinkMenu, changeLink] = useLinkMenu();
  const [wallpaperMenuState, onOpenWallpaperMenu, onCloseWallpaperMenu] = useWallpaperMenu();
  const { isOpen: isOpenLand, onOpen: onOpenLand, onClose: onCloseLand } = useDisclosure();
  const { scaled, changeScaled } = useZoom();
  const [landObjects, plus, minus, setLandObjects, tryWrite, tryRemove, reset] = useLand(depositObjects, isEdit);
  useClouds(isMobile);

  const {
    onView,
    onEdit,
    onDropObject,
    onMoveObject,
    onPickLandObject,
    onRemoveObject,
    onChangeLink,
    onChangeWallpaper,
    onChangeScaled,
    onSave,
  } = useHandler({
    phiObjects,
    wallpaper: undefined,
    uiHandler: {
      edit,
      view,
      tryRemove,
      changeLink,
      changeScaled,
      save: async () => Promise.resolve(undefined),
    },
  });
  const { initialized } = useGame({
    state: { currentENS: "", isEdit: false, phiObjects, wallpaper: undefined },
    gameHandler: {
      onOpenActionMenu,
      onOpenWallpaperMenu,
      onChangeLinkMenu: changeLink,
      onPlaceFromLand: tryWrite,
      onChangeScaled: changeScaled,
    },
  });

  useEffect(() => onEdit(), [onEdit]);
  useEffect(() => onOpenLand(), []);

  return (
    <>
      <Header />
      <Help />
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
        currentWallpaper={undefined}
        balanceWallpapers={balanceWallpapers}
        onClose={onCloseWallpaperMenu}
        onChangeWallpaper={onChangeWallpaper}
      />
      <Land
        objects={landObjects}
        isEdit={true}
        isOpen={isOpenLand}
        onClose={onCloseLand}
        setObjects={setLandObjects}
        onClickPlus={plus}
        onClickMinus={minus}
        onClickObject={onPickLandObject}
        reset={reset}
        onSubmit={onSave}
        onClickNavi={() => {}}
        onRefetch={() => {}}
      />
      <MenuBar
        initialized={initialized}
        isDiff={false}
        noObjectsInLand={false}
        isEdit={true}
        isOpen={{ wallet: false, land: isOpenLand }}
        playground
        currentENS=""
        domains={[]}
        currentWallpaper={undefined}
        balanceWallpapers={balanceWallpapers}
        scaled={scaled}
        actionHandler={{
          onOpenWallet: () => {},
          onOpenLand: onOpenLand,
          onCloseLand,
          onSwitchCurrentENS: () => {},
          onChangeWallpaper,
          onChangeScaled,
          onView,
          onEdit,
          onSave,
          onRefetch: () => {},
        }}
      />
    </>
  );
};

export default Index;
