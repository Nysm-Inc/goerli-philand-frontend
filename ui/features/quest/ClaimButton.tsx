import { FC } from "react";
import { Text, useBoolean } from "@chakra-ui/react";
import type { TransactionResponse } from "@ethersproject/providers";
import { Button, Icon, useNavi } from "~/ui/components";

const ClaimButton: FC<{
  claimable: boolean;
  claimed: boolean;
  onClick: () => Promise<TransactionResponse | undefined>;
  onClickAfterTx: () => void;
}> = ({ claimable, claimed, onClick, onClickAfterTx }) => {
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
                await res?.wait();
                stopLoading();
                openNavi("Claimed Objects into Collection.", "Open Collection", onClickAfterTx);
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
