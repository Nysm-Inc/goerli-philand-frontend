import { FC, useContext } from "react";
import { useProvider } from "wagmi";
import { Center, HStack, Progress, Text, useBoolean } from "@chakra-ui/react";
import type { TransactionResponse } from "@ethersproject/providers";
import { AppContext } from "~/contexts";
import Icon from "~/ui/components/Icon";
import useNavi from "~/ui/components/NaviNotification";
import Button from "~/ui/components/common/Button";

import { event } from "~/utils/ga/ga";

const ClaimButton: FC<{
  claimable: boolean;
  claimed: boolean;
  progress: {
    counter: number;
    value: number;
  };
  onClick: () => Promise<TransactionResponse | undefined>;
  onClickNavi: () => void;
}> = ({ claimable, progress, claimed, onClick, onClickNavi }) => {
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
                openNavi("You can now find your objects in your wallet.", "Open Wallet", onClickNavi);
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
            <Center
              position="relative"
              w="full"
              h="48px"
              p="12px"
              borderRadius="12px"
              cursor="not-allowed"
              bgColor={colorMode === "light" ? "warmgrey.90" : "dark.grey800"}
            >
              <Progress w="full" p="2px" bgColor="grey.900" borderRadius="48px" value={(progress.counter / progress.value) * 100} />
              <HStack position="absolute" right="calc(12px + 4px)" top="calc(50% + 2px)" transform="translateY(-50%)" spacing="0px">
                <Text textStyle="button-1" color="green.250">
                  {Number.isInteger(progress.counter) ? progress.counter : progress.counter.toFixed(1)}
                </Text>
                <Text pt="6px" textStyle="button-1" fontSize="9px" color="white">{`/${progress.value}`}</Text>
              </HStack>
            </Center>
          )}
        </>
      )}
    </>
  );
};

export default ClaimButton;
