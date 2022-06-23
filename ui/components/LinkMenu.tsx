import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { Box, Center, Flex, Input, Popover, PopoverContent, Text, VStack } from "@chakra-ui/react";
import { PhiLink } from "~/types";
import { ActionMenuState } from "./ActionMenu";

export type LinkMenuState = ActionMenuState & PhiLink;
export type LinkState = { [id: string]: LinkMenuState };
const defaultLink = { title: "", url: "" };

export const useLinkMenu = (): [LinkState, (menu: ActionMenuState) => void, (id: string) => void, (id: string, link: PhiLink) => void] => {
  const [state, setState] = useState<LinkState>({});

  const onOpen = (menu: ActionMenuState) => {
    setState((prev) => ({ ...prev, [menu.id]: { ...prev[menu.id], id: menu.id, x: menu.x, y: menu.y, isShown: true } }));
  };
  const onClose = (id: string) => {
    setState((prev) => ({ ...prev, [id]: { ...prev[id], isShown: false } }));
  };
  const onChange = (id: string, link: PhiLink) => {
    setState((prev) => ({ ...prev, [id]: { ...prev[id], id, title: link.title, url: link.url } }));
  };

  return [state, onOpen, onClose, onChange];
};

const LinkMenu: FC<{
  state?: LinkMenuState;
  onClose: (id: string) => void;
  onBack: () => void;
  onChange: (id: string, link: PhiLink) => void;
}> = ({ state, onClose, onBack, onChange }) => {
  const [input, setInput] = useState<PhiLink>(defaultLink);

  useEffect(() => {
    setInput(state || defaultLink);
  }, [state?.isShown]);

  return (
    <>
      {state && (
        <Box position="fixed" left={state.x} top={state.y}>
          <Popover
            isOpen={state.isShown}
            onClose={() => {
              onClose(state.id);
              onBack();
            }}
          >
            <PopoverContent
              w="264px"
              h="192px"
              p="16px"
              border="1px solid"
              borderColor="black"
              borderRadius="none"
              bgColor="white"
              _focus={{ outline: "none" }}
              _focusVisible={{ outline: "none" }}
            >
              <VStack>
                <Text>Link Menu</Text>
                <Input
                  variant="outline"
                  _focus={{ outline: "none" }}
                  _focusVisible={{ outline: "none" }}
                  placeholder="title"
                  paddingLeft="8px"
                  value={input?.title || ""}
                  onChange={(e) => setInput((prev) => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  variant="outline"
                  _focus={{ outline: "none" }}
                  _focusVisible={{ outline: "none" }}
                  placeholder="link"
                  paddingLeft="8px"
                  value={input?.url || ""}
                  onChange={(e) => setInput((prev) => ({ ...prev, url: e.target.value }))}
                />
                <Flex>
                  <Center
                    w="40px"
                    h="40px"
                    cursor="pointer"
                    onClick={() => {
                      onChange(state.id, { title: input.title, url: input.url });
                      onClose(state.id);
                      onBack();
                    }}
                  >
                    ✅
                  </Center>
                  <Center
                    w="40px"
                    h="40px"
                    cursor="pointer"
                    onClick={() => {
                      onChange(state.id, defaultLink);
                      onClose(state.id);
                      onBack();
                    }}
                  >
                    <Image src="/icons/trash.svg" width="24px" height="24px" />
                  </Center>
                </Flex>
              </VStack>
            </PopoverContent>
          </Popover>
        </Box>
      )}
    </>
  );
};

export default LinkMenu;
