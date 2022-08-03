import { FC, useContext } from "react";
import { Box, Menu, MenuButton } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Icon from "./Icon";
import IconButton from "./IconButton";
import MenuList from "./MenuList";
import { CANNY_URL, SURVEY_FORM_URL, HIRING_URL, PARTNERSHIP_APPLICATION_URL } from "~/constants";

const Help: FC<{ onOpenHowItWorks: () => void }> = ({ onOpenHowItWorks }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Box zIndex="default" position="fixed" bottom="32px" right="24px">
      <Menu variant="unstyled" autoSelect={false}>
        <MenuButton as={IconButton} ariaLabel="help" icon={<Icon name="help" color={colorMode === "light" ? "grey.900" : "white"} />} />
        <MenuList
          w="200px"
          options={[
            { label: "How It Works", value: "", onClick: onOpenHowItWorks },
            { label: "Survey", value: "", onClick: () => window.open(SURVEY_FORM_URL, "_blank") },
            { label: "Bug Reports", value: "", onClick: () => window.open(CANNY_URL + "/bug-reports", "_blank") },
            { label: "Feature Requests", value: "", onClick: () => window.open(CANNY_URL + "/feature-requests", "_blank") },
            { label: "Hiring", value: "", onClick: () => window.open(HIRING_URL, "_blank") },
            { label: "Partnership", value: "", onClick: () => window.open(PARTNERSHIP_APPLICATION_URL, "_blank") },
          ]}
        />
      </Menu>
    </Box>
  );
};

export default Help;
