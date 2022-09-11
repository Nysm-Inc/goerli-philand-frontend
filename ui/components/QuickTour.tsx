import { Box, HStack, LayoutProps, PositionProps, Text, TransformProps, VStack } from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import { QUICK_TOUR_KEY } from "~/constants";
import { AppContext } from "~/contexts";
import Button from "./common/Button";
import Tooltip from "./common/Tooltip";

const Tour: FC<{
  w: LayoutProps["w"];
  bottom: PositionProps["bottom"];
  left: PositionProps["left"];
  transform?: TransformProps["transform"];
  rectLeft?: PositionProps["left"];
  rectTransform?: TransformProps["transform"];
  title: string;
  description: string;
  buttonText?: string;
  onClickBack?: () => void;
  onClickNext?: () => void;
}> = ({ w, bottom, left, transform, rectLeft, rectTransform, title, description, buttonText, onClickBack, onClickNext }) => {
  const { colorMode } = useContext(AppContext);

  return (
    <Box zIndex="default" position="fixed" bottom={bottom} left={left} transform={transform}>
      <Tooltip rectLeft={rectLeft} rectTransform={rectTransform}>
        <VStack w={w} p="16px" spacing="16px">
          <VStack spacing="8px" align="flex-start">
            <Text textStyle="headline-2" color={colorMode === "light" ? "white" : "grey.900"}>
              {title}
            </Text>
            <Text textStyle="paragraph-2" color={colorMode === "light" ? "white" : "grey.900"}>
              {description}
            </Text>
          </VStack>
          <HStack marginLeft="auto !important">
            {onClickBack && (
              <Button w="64px" h="32px" borderRadius="8px" onClick={onClickBack}>
                <Text textStyle="button-2" color={colorMode === "light" ? "grey.900" : "white"}>
                  Back
                </Text>
              </Button>
            )}
            {onClickNext && (
              <Button w="64px" h="32px" color="yellow" borderRadius="8px" onClick={onClickNext}>
                <Text textStyle="button-2">{buttonText || "Next"}</Text>
              </Button>
            )}
          </HStack>
        </VStack>
      </Tooltip>
    </Box>
  );
};

const Tour1: FC<{ onClickNext: () => void }> = ({ onClickNext }) => (
  <Tour
    bottom="calc(106px + 16px)"
    left="24px"
    rectLeft="46px"
    w="295px"
    title="1/3 Get objects"
    description="You can get your objects from shop and quest"
    onClickNext={onClickNext}
  />
);

const Tour2: FC<{ onClickBack: () => void; onClickNext: () => void }> = ({ onClickBack, onClickNext }) => (
  <Tour
    bottom="calc(95px + 16px)"
    left="calc(50% - 92px)"
    transform="translateX(-50%)"
    w="312px"
    title="2/3 Check and deposit objects"
    description="Objects you claimed or purchased will show up in your wallet. You can then deposit your objects from your wallet to start decorating your land."
    onClickBack={onClickBack}
    onClickNext={onClickNext}
  />
);

const Tour3: FC<{ onClickBack: () => void; onClickNext: () => void }> = ({ onClickBack, onClickNext }) => (
  <Tour
    bottom="calc(95px + 16px)"
    left="calc(50% + 238px)"
    transform="translateX(-50%)"
    w="294px"
    title="3/3 Edit and save your land"
    description="Press Edit to switch to Edit Mode, where you can place objects. And press Save to save your land."
    onClickBack={onClickBack}
    onClickNext={onClickNext}
  />
);

const Tour4: FC<{ ens: string; onClickBack: () => void; onClickNext: () => void }> = ({ ens, onClickBack, onClickNext }) => (
  <Tour
    bottom="calc(80px + 16px)"
    left="calc(100% - 320px)"
    rectLeft="208px"
    w="294px"
    title="Share your land on Twitter!"
    description={`Show your newly created ${ens} to your friends!`}
    buttonText="Got it"
    onClickBack={onClickBack}
    onClickNext={onClickNext}
  />
);

const QuickTour: FC<{ isEdit: boolean; ens: string }> = ({ isEdit, ens }) => {
  const [done, setDone] = useState(true);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    const done = localStorage.getItem(QUICK_TOUR_KEY);
    if (!done) setDone(false);
  }, []);

  if (isEdit || done) {
    return <></>;
  }

  switch (step) {
    case 1: {
      return <Tour1 onClickNext={() => setStep(2)} />;
    }
    case 2: {
      return <Tour2 onClickBack={() => setStep(1)} onClickNext={() => setStep(3)} />;
    }
    case 3: {
      return <Tour3 onClickBack={() => setStep(2)} onClickNext={() => setStep(4)} />;
    }
    case 4: {
      return (
        <Tour4
          ens={ens}
          onClickBack={() => setStep(3)}
          onClickNext={() => {
            setDone(true);
            localStorage.setItem(QUICK_TOUR_KEY, "true");
          }}
        />
      );
    }
  }
};

export default QuickTour;
