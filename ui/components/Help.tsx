import { FC, useContext } from "react";
import { Box, Menu, MenuButton } from "@chakra-ui/react";
import {
  CANNY_URL,
  SURVEY_URL,
  HIRING_URL,
  PARTNERSHIP_APPLICATION_URL,
  FAQ_URL,
  TERM_OF_SERVICE_URL,
  PRIVACY_POLICY_URL,
} from "~/constants";
import { AppContext } from "~/contexts";
import Icon from "./Icon";
import IconButton from "./common/IconButton";
import MenuList from "./common/MenuList";

const options = [
  { label: "FAQs", value: "", onClick: () => window.open(FAQ_URL, "_blank") },
  { label: "Survey", value: "", onClick: () => window.open(SURVEY_URL, "_blank") },
  { label: "Bug Reports", value: "", onClick: () => window.open(CANNY_URL + "/bug-reports", "_blank") },
  { label: "Feature Requests", value: "", onClick: () => window.open(CANNY_URL + "/feature-requests", "_blank"), divider: true },
  { label: "Hiring", value: "", onClick: () => window.open(HIRING_URL, "_blank") },
  { label: "Partnership", value: "", onClick: () => window.open(PARTNERSHIP_APPLICATION_URL, "_blank"), divider: true },
  { label: "Term of service", value: "", onClick: () => window.open(TERM_OF_SERVICE_URL, "_blank"), textColor: "grey.500" },
  { label: "Privacy policy", value: "", onClick: () => window.open(PRIVACY_POLICY_URL, "_blank"), textColor: "grey.500" },
];

const Help: FC<{ onOpenHowItWorks?: () => void }> = ({ onOpenHowItWorks }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Box zIndex="default" position="fixed" bottom="32px" right="24px">
      <Menu variant="unstyled" autoSelect={false}>
        <MenuButton as={IconButton} ariaLabel="help" icon={<Icon name="help" color={colorMode === "light" ? "grey.900" : "white"} />} />
        <MenuList
          w="200px"
          maxH="358px"
          options={onOpenHowItWorks ? [{ label: "How It Works", value: "", onClick: onOpenHowItWorks }, ...options] : options}
        />
      </Menu>
    </Box>
  );
};

export default Help;
