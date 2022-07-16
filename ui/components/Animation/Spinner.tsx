import { FC } from "react";
import { Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import spinner from "~/public/animations/spinner.json";

const Spinner: FC = () => (
  <Box w="24px" h="24px">
    <Lottie animationData={spinner} loop={true} />
  </Box>
);

export default Spinner;
