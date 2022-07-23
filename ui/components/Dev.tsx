import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { APP_ENV } from "~/constants";

const Dev: FC = () => <>{APP_ENV === "dev" && <Box position="fixed" w="100vw" h="3px" bgColor="red.350" />}</>;

export default Dev;
