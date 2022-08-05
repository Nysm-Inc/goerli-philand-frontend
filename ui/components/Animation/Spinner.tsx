import dynamic from "next/dynamic";
import { FC } from "react";
import { Box } from "@chakra-ui/react";
import spinner from "~/public/animations/spinner.json";
import spinnerLight from "~/public/animations/spinner_light.json";
import spinnerDark from "~/public/animations/spinner_dark.json";
import { ColorMode } from "~/ui/styles";

const Lottie = dynamic(() => import("lottie-react"));

const Spinner: FC<{ size?: string; mode?: ColorMode | "default" }> = ({ size = "24px", mode = "default" }) => (
  <Box w={size} h={size}>
    <Lottie animationData={{ light: spinnerLight, dark: spinnerDark, default: spinner }[mode]} loop={true} />
  </Box>
);

export default Spinner;
