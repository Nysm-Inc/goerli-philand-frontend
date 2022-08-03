import { FC, useContext, useEffect, useState } from "react";
import { HStack, Modal, ModalContent, VStack } from "@chakra-ui/react";
import { PhiLink } from "~/types";
import { AppContext } from "~/contexts";
import { ActionMenuState } from "./ActionMenu";
import Input from "./Input";
import Button from "./Button";
import Icon from "./Icon";

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
  const { colorMode } = useContext(AppContext);
  const [input, setInput] = useState<PhiLink>(defaultLink);

  useEffect(() => {
    setInput(state || defaultLink);
  }, [state?.isShown]);

  return (
    <>
      {state && (
        <Modal
          isOpen={state.isShown}
          onClose={() => {
            onClose(state.id);
            onBack();
          }}
        >
          <ModalContent
            p="8px"
            position="absolute"
            w="264px"
            h="176px"
            boxShadow="-2px 4px 8px rgba(13, 13, 13, 0.1)" // todo
            borderRadius="20px"
            bgColor={colorMode === "light" ? "white" : "grey.900"}
            left={state.x}
            top={state.y - 192}
          >
            <VStack spacing="8px">
              <Input
                w="full"
                placeholder="Title"
                shadow={false}
                value={input?.title || ""}
                onChange={(e) => setInput((prev) => ({ ...prev, title: e.target.value }))}
              />
              <Input
                w="full"
                placeholder="URL or .eth"
                shadow={false}
                value={input?.url || ""}
                onChange={(e) => setInput((prev) => ({ ...prev, url: e.target.value }))}
              />
              <HStack spacing="8px">
                <Button
                  w="120px"
                  color="green"
                  onClick={() => {
                    onChange(state.id, { title: input.title, url: input.url });
                    onClose(state.id);
                    onBack();
                  }}
                >
                  <Icon name="check" />
                </Button>
                <Button
                  w="120px"
                  color="red"
                  onClick={() => {
                    onChange(state.id, defaultLink);
                    onClose(state.id);
                    onBack();
                  }}
                >
                  <Icon name="trash" />
                </Button>
              </HStack>
            </VStack>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default LinkMenu;
