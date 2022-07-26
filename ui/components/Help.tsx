import { FC, useContext } from "react";
import { Box, Menu, MenuButton } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Icon from "./Icon";
import IconButton from "./IconButton";
import MenuList from "./MenuList";
import { BUG_REPORT, FEEDBACK_FORM, HIRING, PARTNERSHIP_APPLICATION } from "~/constants";

const Help: FC<{ onOpenHowItWorks: () => void }> = ({ onOpenHowItWorks }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Box position="fixed" bottom="32px" right="24px">
      <Menu variant="unstyled" autoSelect={false}>
        {({ isOpen }) => (
          <>
            <MenuButton as={IconButton} ariaLabel="help" icon={<Icon name="help" color={colorMode === "light" ? "grey.900" : "white"} />} />
            <MenuList
              w="180px"
              isOpen={isOpen}
              options={[
                { label: "How It Works", value: "", onClick: onOpenHowItWorks },
                { label: "Feedbacks", value: "", onClick: () => window.open(FEEDBACK_FORM, "_blank") },
                { label: "Bug Reports", value: "", onClick: () => window.open(BUG_REPORT, "_blank") },
                { label: "Hiring", value: "", onClick: () => window.open(HIRING, "_blank") },
                { label: "Partnership", value: "", onClick: () => window.open(PARTNERSHIP_APPLICATION, "_blank") },
              ]}
            />
          </>
        )}
      </Menu>
    </Box>
  );
};

export default Help;
