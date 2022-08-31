import { Box } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { FRONTEND_URL } from "~/constants";
import { AppContext } from "~/contexts";
import { event } from "~/utils/ga/ga";
import Icon from "./Icon";
import IconButton from "./common/IconButton";

const Share: FC<{ currentENS: string }> = ({ currentENS }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Box zIndex="default" position="fixed" bottom="32px" right="calc(24px + 48px + 16px)">
      <IconButton
        ariaLabel="share"
        icon={<Icon name="share" color={colorMode === "light" ? "grey.900" : "white"} />}
        onClick={() => {
          event({ action: "conversion_share" });
          window.open(
            `https://twitter.com/intent/tweet?text=Come visit my philand @phi_xyz&url=${FRONTEND_URL}/${currentENS}&hashtags=philand`,
            "_blank"
          );
        }}
      />
    </Box>
  );
};

export default Share;
