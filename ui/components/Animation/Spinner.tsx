import { FC } from "react";
import { Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import spinner from "~/public/animations/spinner.json";

const Spinner: FC<{ size?: string }> = ({ size = "24px" }) => (
  <Box w={size} h={size}>
    <Lottie animationData={spinner} loop={true} />
  </Box>
);

export default Spinner;
