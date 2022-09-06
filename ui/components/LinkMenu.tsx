import { FC, useContext, useEffect, useState } from "react";
import { HStack, Modal, ModalContent, VStack } from "@chakra-ui/react";
import { PhiLink } from "~/types";
import { AppContext } from "~/contexts";
import { event } from "~/utils/ga/ga";
import { ActionMenuState } from "./ActionMenu";
import Input from "./common/Input";
import Button from "./common/Button";
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
    setInput({ title: state?.title || "", url: state?.url || "" });
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
            boxShadow="md"
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
                placeholder="https://mumbai.philand.xyz/vitalik.eth"
                shadow={false}
                value={input?.url || ""}
                onChange={(e) => setInput((prev) => ({ ...prev, url: e.target.value }))}
              />
              <HStack spacing="8px">
                <Button
                  w="120px"
                  color="green"
                  onClick={() => {
                    try {
                      const url = new URL(input.url);
                      if (url.protocol !== "https:") return;

                      event({ action: "conversion_set_link" });
                      onChange(state.id, { title: input.title, url: url.toString() });
                      onClose(state.id);
                      onBack();
                    } catch {}
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
