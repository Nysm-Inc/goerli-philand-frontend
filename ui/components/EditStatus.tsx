import { FC, useContext, useEffect, useState } from "react";
import { Center, ColorProps, HStack, Text } from "@chakra-ui/react";
import { AppContext } from "~/contexts";
import { Tx } from "~/types/tx";
import { ColorMode } from "~/ui/styles";
import Icon, { IconName } from "./Icon";

type Status = "unedited" | "editing" | "saving" | "saved";

const labels: { [status in Status]: string } = {
  unedited: "Unedited",
  editing: "Editing",
  saving: "Saving...",
  saved: "Saved",
};

const icons: { [status in Status]: IconName } = {
  unedited: "edit",
  editing: "edit",
  saving: "timer",
  saved: "check",
};

const getColor = (status: Status, colorMode: ColorMode): ColorProps["color"] => {
  switch (status) {
    case "unedited": {
      return colorMode === "light" ? "white" : "grey.900";
    }
    case "editing": {
      return "purple.250";
    }
    case "saving": {
      return "yellow.250";
    }
    case "saved": {
      return "green.250";
    }
  }
};

const EditStatus: FC<{ isDiff: boolean; saveTx: Tx }> = ({ isDiff, saveTx }) => {
  const { colorMode } = useContext(AppContext);
  const [editStatus, setEditStatus] = useState<{ status: Status; locked: boolean }>({ status: "unedited", locked: false });

  useEffect(() => {
    switch (saveTx.status) {
      case "loading": {
        setEditStatus((prev) => ({ ...prev, status: "saving" }));
        return;
      }
      case "success": {
        setEditStatus((prev) => (prev.status === "saving" ? { status: "saved", locked: true } : prev));
        setTimeout(() => setEditStatus((prev) => ({ ...prev, locked: false })), 3000);
        return;
      }
    }
  }, [saveTx.status]);

  useEffect(() => {
    setEditStatus((prev) => (prev.locked ? prev : { ...prev, status: isDiff ? "editing" : "unedited" }));
  }, [isDiff, editStatus.locked]);

  return (
    <HStack
      zIndex="default"
      position="fixed"
      bottom="calc(95px + 16px)"
      left="50%"
      transform="translateX(-50%)"
      p="4px 16px 4px 4px"
      spacing="8px"
      h="36px"
      boxShadow="md"
      borderRadius="60px"
      border="1px solid"
      bgColor={colorMode === "light" ? "grey.900" : "white"}
      borderColor={colorMode === "light" ? "dark.grey800" : "grey.200"}
    >
      <Center w="28px" h="28px" borderRadius="24px" bgColor={getColor(editStatus.status, colorMode)}>
        <Icon name={icons[editStatus.status]} color={colorMode === "light" ? "grey.900" : "white"} />
      </Center>
      <Text textStyle="label-1" color={colorMode === "light" ? "white" : "grey.900"}>
        {labels[editStatus.status]}
      </Text>
    </HStack>
  );
};

export default EditStatus;
