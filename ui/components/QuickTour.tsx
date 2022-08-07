import { Box, HStack, LayoutProps, PositionProps, Text, TransformProps, VStack } from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import { QUICK_TOUR_KEY } from "~/constants";
import { AppContext } from "~/contexts";
import Button from "./Button";
import Tooltip from "./Tooltip";

const Tour: FC<{
  w: LayoutProps["w"];
  bottom: PositionProps["bottom"];
  left: PositionProps["left"];
  transform?: TransformProps["transform"];
  rectLeft?: PositionProps["left"];
  rectTransform?: TransformProps["transform"];
  title: string;
  description: string;
  onClickBack?: () => void;
  onClickNext?: () => void;
}> = ({ w, bottom, left, transform, rectLeft, rectTransform, title, description, onClickBack, onClickNext }) => {
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
                <Text textStyle="button-2">Next</Text>
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
    description="First of all, Get Objects with Shop or Quest"
    onClickNext={onClickNext}
  />
);

const Tour2: FC<{ onClickBack: () => void; onClickNext: () => void }> = ({ onClickBack, onClickNext }) => (
  <Tour
    bottom="calc(95px + 16px)"
    left="calc(50% - 16px)"
    transform="translateX(-50%)"
    w="312px"
    title="2/3 Check and deposit objects"
    description="Check the objects you got on this modal. Then, please deposit objects you want to place on your land."
    onClickBack={onClickBack}
    onClickNext={onClickNext}
  />
);

const Tour3: FC<{ onClickBack: () => void; onClickNext: () => void }> = ({ onClickBack, onClickNext }) => (
  <Tour
    bottom="calc(95px + 16px)"
    left="calc(50% + 148px)"
    transform="translateX(-50%)"
    w="294px"
    title="3/3 Edit and save your land"
    description="Press Edit to switch to Edit Mode, where you can place objects. And press Save to save your land."
    onClickBack={onClickBack}
    onClickNext={onClickNext}
  />
);

const Tour4: FC<{ onClickBack: () => void; onClickNext: () => void }> = ({ onClickBack, onClickNext }) => (
  <Tour
    bottom="calc(80px + 16px)"
    left="calc(100% - 320px)"
    rectLeft="208px"
    w="294px"
    title="Share your land on Twitter!"
    description="Finally, please share your land to the world!"
    onClickBack={onClickBack}
    onClickNext={onClickNext}
  />
);

const QuickTour: FC = () => {
  const [done, setDone] = useState(true);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    const done = localStorage.getItem(QUICK_TOUR_KEY);
    if (!done) setDone(false);
  }, []);

  if (done) {
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
