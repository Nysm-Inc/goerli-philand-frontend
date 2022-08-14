import { FC } from "react";
import { useProvider } from "wagmi";
import { Text, useBoolean } from "@chakra-ui/react";
import type { TransactionResponse } from "@ethersproject/providers";
import Icon from "~/ui/components/Icon";
import useNavi from "~/ui/components/NaviNotification";
import Button from "~/ui/components/common/Button";

const ClaimButton: FC<{
  claimable: boolean;
  claimed: boolean;
  onClick: () => Promise<TransactionResponse | undefined>;
  onClickAfterTx: () => void;
}> = ({ claimable, claimed, onClick, onClickAfterTx }) => {
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
            <Button w="full" leftIcon={<Icon name="check" />}>
              <Text color="white" textStyle="button-1">
                Claimed
              </Text>
            </Button>
          ) : (
            <Button w="full" disabled>
              <Text color="white" textStyle="button-1">
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
