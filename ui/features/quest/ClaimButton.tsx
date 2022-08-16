import { FC, useContext } from "react";
import { useProvider } from "wagmi";
import { Text, useBoolean } from "@chakra-ui/react";
import type { TransactionResponse } from "@ethersproject/providers";
import { AppContext } from "~/contexts";
import Icon from "~/ui/components/Icon";
import useNavi from "~/ui/components/NaviNotification";
import Button from "~/ui/components/common/Button";
import { event } from "~/utils/ga/ga";

const ClaimButton: FC<{
  claimable: boolean;
  claimed: boolean;
  onClick: () => Promise<TransactionResponse | undefined>;
  onClickAfterTx: () => void;
}> = ({ claimable, claimed, onClick, onClickAfterTx }) => {
  const { colorMode } = useContext(AppContext);
  const provider = useProvider();
  const [isLoading, { on: startLoading, off: stopLoading }] = useBoolean();
  const openNavi = useNavi();

  return (
    <>
      {claimable && !claimed ? (
        <Button
          w="full"
          color="purple"
          isLoading={isLoading}
          onClick={() => {
            startLoading();
            onClick()
              .then(async (res) => {
                if (!res?.hash) throw new Error("invalid hash");
                event({ action: "conversion_get_quest" });

                await provider.waitForTransaction(res.hash);
                stopLoading();
                openNavi("You can now find your objects in your wallet.", "Open Wallet", onClickAfterTx);
              })
              .catch(stopLoading);
          }}
        >
          <Text color="white" textStyle="button-1">
            Claim
          </Text>
        </Button>
      ) : (
        <>
          {claimed ? (
            <Button w="full" leftIcon={<Icon name="check" color={colorMode === "light" ? "grey.900" : "white"} />} disabled>
              <Text color="white" textStyle="button-1">
                Claimed
              </Text>
            </Button>
          ) : (
            <Button w="full" color="purple" disabled>
              <Text
                color="grey.500"
                textStyle="button-1"
                textShadow="3px 3px 0px rgba(26, 26, 26, 0.2)"
                style={{ WebkitTextStroke: colorMode === "light" ? "1px #CCCCCC" : "1px #292929" }}
              >
                Not Eligible
              </Text>
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default ClaimButton;
