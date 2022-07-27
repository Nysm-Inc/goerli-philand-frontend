import Image from "next/image";
import { FC, useContext } from "react";
import { Box } from "@chakra-ui/react";
import { AppContext } from "~/contexts";

const Clouds: FC = () => {
  const { colorMode } = useContext(AppContext);

  return (
    <>
      <Box zIndex="clouds" position="fixed" w="426px" h="285px" left="0" top="0">
        <Image src={`/assets/clouds/cloud_lefttop_${colorMode}.svg`} layout="fill" objectFit="cover" />
      </Box>

      <Box zIndex="clouds" position="fixed" w="466px" h="301px" right="0" top="0">
        <Image src={`/assets/clouds/cloud_righttop_${colorMode}.svg`} layout="fill" objectFit="cover" />
      </Box>

      <Box zIndex="clouds" position="fixed" w="418px" h="312px" left="0" bottom="0">
        <Image src={`/assets/clouds/cloud_leftbottom_${colorMode}.svg`} layout="fill" objectFit="cover" />
      </Box>

      <Box zIndex="clouds" position="fixed" w="466px" h="312px" right="0" bottom="0">
        <Image src={`/assets/clouds/cloud_rightbottom_${colorMode}.svg`} layout="fill" objectFit="cover" />
      </Box>
    </>
  );
};

export default Clouds;
