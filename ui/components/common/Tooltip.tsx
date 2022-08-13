import { FC, ReactNode, useContext } from "react";
import { BorderProps, Box, PositionProps, TransformProps } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { colors } from "~/ui/styles/color";

const Tooltip: FC<{
  rectLeft?: PositionProps["left"];
  rectTransform?: TransformProps["transform"];
  borderRadius?: BorderProps["borderRadius"];
  children: ReactNode;
}> = ({ rectLeft, rectTransform, borderRadius = "16px", children }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Box position="relative" bgColor={colorMode === "light" ? "grey.900" : "white"} borderRadius={borderRadius}>
      {children}
      <Box
        position="absolute"
        left={rectLeft || "50%"}
        transform={rectTransform || "translateX(-50%)"}
        borderTop={`6px solid ${colorMode === "light" ? colors.grey[900] : colors.white}`}
        borderLeft="6px solid transparent"
        borderRight="6px solid transparent"
      />
    </Box>
  );
};

export default Tooltip;
