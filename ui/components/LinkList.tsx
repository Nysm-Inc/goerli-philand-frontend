import NextImage from "next/image";
import { FC, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Box, Center, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { PhiObject } from "~/types";
import IconButton from "./common/IconButton";
import Icon from "./Icon";
import { jump } from "~/utils/url";

const defaultLinkOGP = (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.5266 7.88515C20.1972 7.72075 19.888 7.56623 19.5789 7.4119C19.0044 7.12499 18.4306 6.83669 17.8547 6.55254C17.787 6.51914 17.7593 6.48397 17.7593 6.40473C17.7623 5.02172 17.7619 3.63872 17.7597 2.25571C17.7597 2.18339 17.7805 2.14604 17.8468 2.11304C19.2444 1.41769 20.6408 0.720156 22.0366 0.0210447C22.093 -0.00721216 22.1349 -0.00681696 22.1909 0.0210447C23.5867 0.720156 24.9831 1.41788 26.3807 2.11304C26.4472 2.14604 26.4676 2.18378 26.4674 2.25591C26.4652 3.63891 26.4652 5.02192 26.4674 6.40493C26.4674 6.47666 26.4482 6.51499 26.3813 6.54819C25.4878 6.99062 24.596 7.4364 23.6942 7.88614C23.7331 7.9057 23.7666 7.9225 23.8002 7.9391C24.6577 8.3673 25.5144 8.79669 26.3734 9.22153C26.4482 9.25848 26.4676 9.30175 26.4676 9.37981C26.4656 11.9383 26.4656 14.4969 26.4682 17.0554C26.4682 17.1433 26.4433 17.1874 26.3631 17.2273C21.689 19.5586 17.0164 21.8927 12.342 24.2238C12.2484 24.2704 12.2196 24.3228 12.2198 24.4247C12.2235 25.5311 12.2215 26.6375 12.2237 27.7438C12.2237 27.8157 12.2037 27.8537 12.1371 27.8867C10.7395 28.582 9.34304 29.2796 7.94723 29.9787C7.89123 30.0067 7.84929 30.0073 7.7929 29.9791C6.39728 29.28 5.00067 28.5822 3.60307 27.8869C3.53699 27.8541 3.51582 27.8167 3.51602 27.7444C3.5178 23.991 3.518 20.237 3.51562 16.4832C3.51562 16.4043 3.54253 16.3689 3.61039 16.3351C5.91533 15.1865 8.21887 14.0349 10.5246 12.8874C10.616 12.842 10.6423 12.7912 10.6419 12.693C10.6384 11.5866 10.6403 10.4802 10.6378 9.37388C10.6378 9.2978 10.6585 9.25868 10.729 9.2237C12.1238 8.53012 13.5172 7.83378 14.9099 7.13605C14.9689 7.10641 15.0142 7.10621 15.0733 7.13605C16.2009 7.70139 17.3298 8.26396 18.4571 8.82969C18.5256 8.86407 18.5786 8.86486 18.6474 8.83008C19.2353 8.53309 19.8252 8.24005 20.4144 7.94562C20.4459 7.92981 20.4766 7.91223 20.5266 7.88535V7.88515ZM19.3476 16.777V19.9339C19.387 19.9159 19.4167 19.9032 19.4456 19.8888C20.3001 19.4624 21.1538 19.0346 22.0099 18.6113C22.0894 18.572 22.1161 18.5289 22.1159 18.44C22.113 16.4118 22.1137 14.3836 22.1137 12.3555V12.2343C20.9215 12.8295 19.7427 13.418 18.5501 14.0133V10.4613C18.508 10.4808 18.4755 10.4951 18.4437 10.5109C17.5921 10.9357 16.7412 11.3619 15.8883 11.784C15.8099 11.8227 15.7808 11.8644 15.7808 11.9545C15.7836 15.1681 15.7832 18.3815 15.7832 21.5951V21.7016C15.8263 21.7073 15.8522 21.6834 15.8807 21.6692C16.7382 21.2416 17.5951 20.8124 18.4538 20.3869C18.5291 20.3496 18.5553 20.3077 18.5551 20.2229C18.5517 19.2385 18.5527 18.254 18.5535 17.2696C18.5535 17.2299 18.5357 17.1825 18.5883 17.1564C18.8354 17.0337 19.0819 16.9102 19.3476 16.7776V16.777ZM14.9918 15.7945C14.951 15.8129 14.9241 15.824 14.8982 15.837C12.8505 16.8596 10.8032 17.8826 8.75445 18.9028C8.68025 18.9397 8.65968 18.9822 8.65968 19.0607C8.66146 22.281 8.66126 25.5011 8.66185 28.7213C8.66185 28.7526 8.65196 28.7858 8.67392 28.8205C8.70399 28.8067 8.73387 28.7943 8.76256 28.7798C9.62003 28.3518 10.4769 27.9226 11.3356 27.4972C11.4078 27.4614 11.4331 27.4215 11.4329 27.3407C11.4301 26.1454 11.4309 24.9501 11.4309 23.7551C11.4309 22.7805 11.4319 21.8057 11.429 20.8312C11.4288 20.7533 11.4523 20.7148 11.5223 20.6822C11.7251 20.5873 11.9236 20.4834 12.1244 20.3842C12.1529 20.3702 12.1788 20.346 12.2209 20.352V23.4915C12.2595 23.4743 12.2892 23.4624 12.3179 23.4482C13.1754 23.0204 14.0322 22.5914 14.8909 22.1661C14.9657 22.1292 14.9942 22.0887 14.994 22.0031C14.9912 19.9716 14.992 17.9399 14.992 15.9083V15.7943L14.9918 15.7945ZM25.6746 10.4591C25.6283 10.4808 25.5959 10.4955 25.5642 10.5113C24.7129 10.9361 23.8621 11.3621 23.0094 11.7838C22.9305 11.8229 22.9026 11.8652 22.9028 11.9547C22.9057 13.9823 22.9051 16.0101 22.9051 18.0377V18.1442C22.9481 18.1503 22.974 18.1264 23.0023 18.1122C23.8596 17.6848 24.7162 17.2556 25.5745 16.8303C25.6495 16.7932 25.6768 16.7521 25.6766 16.6669C25.6738 14.636 25.6744 12.605 25.6744 10.5741V10.4589L25.6746 10.4591ZM25.6746 3.34627C25.6398 3.36208 25.6218 3.36939 25.6044 3.37808C24.7297 3.81458 23.8554 4.25167 22.9799 4.6862C22.92 4.71604 22.9034 4.7518 22.9036 4.81563C22.9057 5.67776 22.9049 6.54009 22.9055 7.40222C22.9055 7.42672 22.8962 7.45379 22.919 7.48126C22.936 7.47395 22.9538 7.46723 22.9708 7.45873C23.8485 7.02085 24.7257 6.58218 25.6044 6.14647C25.6669 6.11544 25.6758 6.07434 25.6756 6.01388C25.6742 5.15827 25.6746 4.30266 25.6746 3.44704V3.34627Z"
      fill="#B3B3B3"
    />
  </svg>
);

const defaultOGPSize = 48;

const LinkOGP: FC<{ url: string }> = ({ url }) => {
  const [ogp, setOGP] = useState<HTMLImageElement | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const u = new URL(url);
        const res = await axios.get<{ ogp: string }>(`/api/fetchOGP?url=${u}`);
        const base64 = res.data.ogp;
        const img = new Image();
        img.src = base64;
        img.onload = () => {
          img.width = defaultOGPSize * (img.width / img.height);
          img.height = defaultOGPSize;
          setOGP(img);
        };
      } catch {}
    })();
  }, [url]);

  return ogp ? (
    <Center
      position="relative"
      borderRadius="8px"
      overflow="hidden"
      minW={defaultOGPSize + "px"}
      maxW={defaultOGPSize + "px"}
      minH={defaultOGPSize + "px"}
      maxH={defaultOGPSize + "px"}
    >
      <NextImage src={ogp.src} width={defaultOGPSize + "px"} height={defaultOGPSize + "px"} objectFit="cover" alt="" />
    </Center>
  ) : (
    <Center
      borderRadius="8px"
      overflow="hidden"
      bgColor="grey.200"
      p="9px"
      minW={defaultOGPSize + "px"}
      maxW={defaultOGPSize + "px"}
      minH={defaultOGPSize + "px"}
      maxH={defaultOGPSize + "px"}
    >
      {defaultLinkOGP}
    </Center>
  );
};

const LinkList: FC<{ isMobile: boolean; phiObjects: PhiObject[]; defaultIsOpen?: boolean }> = ({ isMobile, phiObjects, defaultIsOpen }) => {
  const { colorMode, game } = useContext(AppContext);

  return (
    <Box zIndex="link-list" position="fixed" bottom={isMobile ? "12px" : "32px"} right={isMobile ? "12px" : "calc(24px + 48px + 16px)"}>
      <Menu variant="unstyled" placement="top" autoSelect={false} closeOnSelect={false} defaultIsOpen={defaultIsOpen}>
        <MenuButton as={IconButton} ariaLabel="list" icon={<Icon name="list" color={colorMode === "light" ? "grey.900" : "white"} />} />
        {phiObjects.length > 0 && (
          <MenuList
            maxHeight="240px"
            borderRadius="12px"
            p="8px"
            overflowY="scroll"
            boxShadow="md"
            maxH="512px"
            border={colorMode === "light" ? "1px solid" : "none"}
            borderColor="light.g_orange"
            bgColor={colorMode === "light" ? "white" : "grey.900"}
            {...(isMobile ? { w: "calc(100vw - 12px * 2)", mr: "12px" } : { w: "320px", mr: "24px" })}
          >
            {phiObjects.map((object, i) => (
              <MenuItem
                key={i}
                w="100%"
                h="64px"
                p="8px"
                gap="8px"
                borderRadius="12px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                bgColor={colorMode === "light" ? "white" : "grey.900"}
                _hover={{ bgColor: colorMode === "light" ? "light.lg_orange40" : "dark.grey700" }}
                _active={{ bgColor: colorMode === "light" ? "white" : "dark.grey700" }}
                _focus={{ bgColor: colorMode === "light" ? "white" : "dark.grey700" }}
                onClick={() => jump(object.link.url, isMobile)}
                onMouseEnter={() => {
                  try {
                    const uuid = game.room.roomItemManager.getUUIDFromTilemap(object.xStart, object.yStart);
                    game.room.roomItemManager.showLinkPreview(uuid);
                  } catch {}
                }}
                onMouseLeave={() => {
                  try {
                    const uuid = game.room.roomItemManager.getUUIDFromTilemap(object.xStart, object.yStart);
                    game.room.roomItemManager.hideLinkPreview(uuid);
                  } catch {}
                }}
              >
                <LinkOGP url={object.link.url} />
                <VStack spacing="0px" align="flex-start">
                  <Text textStyle="paragraph-1" h="24px" color={colorMode === "light" ? "warmgrey.20" : "grey.200"}>
                    {object.link.title}
                  </Text>
                  <Text textStyle="label-2" h="16px" color={colorMode === "light" ? "warmgrey.60" : "warmgrey.50"}>
                    {object.link.url}
                  </Text>
                </VStack>
              </MenuItem>
            ))}
          </MenuList>
        )}
      </Menu>
    </Box>
  );
};

export default LinkList;
