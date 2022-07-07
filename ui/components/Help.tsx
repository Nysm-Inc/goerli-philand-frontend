import { FC, useContext } from "react";
import { Box, Menu, MenuButton } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Icon from "./Icon";
import IconButton from "./IconButton";
import MenuList from "./MenuList";

const Help: FC = () => {
  const { colorMode } = useContext(AppContext);

  return (
    <Box position="fixed" bottom="32px" right="24px">
      <Menu variant="unstyled" autoSelect={false}>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={IconButton}
              ariaLabel="help"
              icon={<Icon name="help" color={colorMode === "light" ? "#1A1A1A" : "#FFFFFF"} />}
            />
            <MenuList
              w="180px"
              isOpen={isOpen}
              options={[
                { label: "Feedbacks", value: "feedbacks", onClick: () => {} },
                { label: "Help & Support", value: "help", onClick: () => {} },
              ]}
            />
          </>
        )}
      </Menu>
    </Box>
  );
};

export default Help;
