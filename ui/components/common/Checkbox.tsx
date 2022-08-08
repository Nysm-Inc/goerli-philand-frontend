import { FC, useContext } from "react";
import { Center } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import Icon from "~/ui/components/Icon";

const Checkbox: FC<{ checked: boolean; disabled?: boolean; onCheck: () => void }> = ({ checked, disabled, onCheck }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Center
      w="32px"
      h="32px"
      cursor="pointer"
      borderRadius="8px"
      {...(checked
        ? {
            bgColor: "primary.500",
            _hover: {
              bgColor: "primary.600",
            },
            // _disabled: {
            //   bgColor: "grey.100",
            //   border: "1px solid",
            //   borderColor: "grey.200",
            // },
          }
        : {
            bgColor: "white",
            border: "1px solid",
            borderColor: colorMode === "light" ? "light.g_orange" : "dark.grey600",
            _hover: {
              bgColor: "white",
              borderColor: colorMode === "light" ? "dark.grey800" : "grey.100",
            },
            // _disabled: {
            //   bgColor: "grey.100",
            //   borderColor: "grey.200",
            // },
          })}
      onClick={onCheck}
    >
      {checked && <Icon name="check" color={colorMode === "light" ? "white" : "grey.900"} />}
    </Center>
  );
};

export default Checkbox;
