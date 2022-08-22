import { FC, useCallback, useContext, useMemo, useState } from "react";
import { useBalance, useProvider } from "wagmi";
import { utils } from "ethers";
import type { TransactionResponse } from "@ethersproject/providers";
import { Box, SimpleGrid, TabPanel, TabPanels, Tabs, useBoolean } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { ShopItemContractAddress } from "~/types";
import Icon from "~/ui/components/Icon";
import useNavi from "~/ui/components/NaviNotification";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "~/ui/components/common/Modal";
import IconButton from "~/ui/components/common/IconButton";
import { Tab, TabList } from "~/ui/components/common/Tab";
import { event } from "~/utils/ga/ga";
import ShopItem from "./Item";
import { defaultItems, Items, tabIdx2Contract } from "./types";

const Shop: FC<{
  address: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fTokenIds: number[], pTokenIds: number[], wTokenIds: number[]) => Promise<TransactionResponse | undefined>;
  onClickNavi: () => void;
  onRefetch: () => void;
}> = ({ address, isOpen, onClose, onSubmit, onClickNavi, onRefetch }) => {
  const { colorMode } = useContext(AppContext);
  const provider = useProvider();
  const { data } = useBalance({ addressOrName: address, watch: isOpen });
  const [tabIdx, setTabIdx] = useState(0);
  const [isLoading, { on: startLoading, off: stopLoading }] = useBoolean();
  const openNavi = useNavi();

  const [items, setItems] = useState<Items>(defaultItems());
  const itemNum = useMemo(
    () =>
      Object.values(items).reduce((sum, _items) => sum + _items.reduce((sum, item) => (item.select > 0 ? sum + item.select : sum), 0), 0),
    [items]
  );
  const itemPrice = useMemo(
    () =>
      Object.values(items).reduce(
        (sum, _items) => sum + _items.reduce((sum, item) => (item.select > 0 ? sum + item.select * item.price : sum), 0),
        0
      ),
    [items]
  );
  const isSelected = useMemo(
    () => Object.values(items).reduce((memo, _items) => memo || _items.some((item) => item.select > 0), false),
    [items]
  );
  const insufficient = useMemo(() => !!data?.value?.lt(utils.parseUnits(itemPrice.toString(), data.decimals)), [data, itemPrice]);

  const plus = useCallback(
    (contract: ShopItemContractAddress, idx: number) => {
      const copied = [...items[contract]];
      copied[idx].select += 1;
      setItems((prev) => ({ ...prev, [contract]: copied }));
    },
    [items]
  );
  const minus = useCallback(
    (contract: ShopItemContractAddress, idx: number) => {
      const copied = [...items[contract]];
      copied[idx].select -= 1;
      setItems((prev) => ({ ...prev, [contract]: copied }));
    },
    [items]
  );
  const reset = useCallback(() => setItems(defaultItems()), []);

  return (
    <Tabs variant="unstyled" onChange={(idx) => setTabIdx(idx)}>
      <Modal w="832px" h="712px" isOpen={isOpen} onClose={onClose} onCloseComplete={reset}>
        <ModalHeader
          title="SHOP"
          buttons={[
            <IconButton
              key="close"
              ariaLabel="close"
              icon={<Icon name="close" color={colorMode === "light" ? "grey.900" : "white"} />}
              size="32px"
              borderRadius="8px"
              boxShadow={false}
              onClick={onClose}
            />,
          ]}
        />
        <Box minH="16px" h="16px" />
        <TabList>
          <Tab text="Object (Free)" />
          <Tab text="Object (Premium)" />
          <Tab text="Wallpaper" />
        </TabList>
        <Box minH="16px" h="16px" />
        <ModalBody>
          <TabPanels id="8">
            {Object.values(tabIdx2Contract).map((idx) => (
              <TabPanel key={idx} p="0">
                <SimpleGrid columns={3} spacing="8px">
                  {items[tabIdx2Contract[tabIdx]].map((item, i) => (
                    <ShopItem
                      key={i}
                      contract={tabIdx2Contract[tabIdx]}
                      item={item}
                      plus={() => plus(tabIdx2Contract[tabIdx], i)}
                      minus={() => minus(tabIdx2Contract[tabIdx], i)}
                    />
                  ))}
                </SimpleGrid>
                {isSelected && <Box h="120px" />}
              </TabPanel>
            ))}
          </TabPanels>
        </ModalBody>
        {isSelected && (
          <Box w="full" position="absolute" bottom="0" left="0">
            <ModalFooter
              text="Purchase"
              subText="After purchase, your objects are stored in your wallet"
              itemNum={itemNum}
              itemPrice={itemPrice}
              isLoading={isLoading}
              disabled={insufficient}
              onClick={() => {
                startLoading();
                const tokenIds = Object.values(items).map((items) =>
                  items.reduce((memo, item) => {
                    return item.select > 0 ? [...memo, ...[...new Array(item.select)].map(() => item.tokenId)] : memo;
                  }, [] as number[])
                );
                onSubmit(tokenIds[0], tokenIds[1], tokenIds[2])
                  .then(async (res) => {
                    if (!res?.hash) throw new Error("invalid hash");

                    event({ action: "conversion_get_shop" });
                    reset();
                    await provider.waitForTransaction(res.hash);
                    onRefetch();
                    stopLoading();
                    openNavi("You can now find your objects in your wallet.", "Open Wallet", onClickNavi);
                  })
                  .catch(stopLoading);
              }}
            />
          </Box>
        )}
      </Modal>
    </Tabs>
  );
};

export default Shop;
