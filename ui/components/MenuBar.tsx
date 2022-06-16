import Image from "next/image";
import { FC } from "react";
import { Center, HStack } from "@chakra-ui/react";
import { FRONTEND_URL } from "~/constants";
import { Button, SelectBox } from "~/ui/components";

const MenuBar: FC<{
  isEdit: boolean;
  account?: string;
  currentENS: string;
  isCreatedPhiland: boolean;
  domains: string[];
  actionHandler: {
    onOpenQuest: () => void;
    onOpenShop: () => void;
    onOpenCollection: () => void;
    onOpenInventry: () => void;
    switchCurrentENS: (ens: string) => void;
    onView: () => void;
    onEdit: () => void;
    onSave: () => void;
  };
}> = ({ isEdit, account, currentENS, isCreatedPhiland, domains, actionHandler }) => {
  return (
    <HStack position="fixed" bottom="24px" left="50%" transform="translateX(-50%)" border="1px solid" borderColor="black" bgColor="white">
      {isCreatedPhiland && (
        <Center w="144px">
          <SelectBox
            options={domains.map((domain) => {
              return { label: domain, value: domain };
            })}
            value={currentENS}
            disabled={!account}
            handleChange={actionHandler.switchCurrentENS}
          />
        </Center>
      )}
      {domains.length > 0 && (
        <>
          <Button icon={<Image src="/icons/sword.svg" width="32px" height="32px" />} onClick={actionHandler.onOpenQuest} />
          <Button icon={<Image src="/icons/store.svg" width="32px" height="32px" />} onClick={actionHandler.onOpenShop} />
          <Button icon={<Image src="/icons/collection.svg" width="32px" height="32px" />} onClick={actionHandler.onOpenCollection} />
          <Button icon={<>🧰</>} onClick={actionHandler.onOpenInventry} />
        </>
      )}
      {isCreatedPhiland && (
        <>
          <Center
            w="40px"
            cursor="pointer"
            onClick={
              isEdit
                ? () => {
                    actionHandler.onSave();
                  }
                : () => {
                    window.open(
                      `https://twitter.com/intent/tweet?text=Come visit my philand @phi_xyz%0a${FRONTEND_URL}/${currentENS}`,
                      "_blank"
                    );
                  }
            }
          >
            <Image src={`/icons/${isEdit ? "disk" : "upload"}.svg`} width="32px" height="32px" />
          </Center>

          <Center w="40px" cursor="pointer" onClick={isEdit ? actionHandler.onView : actionHandler.onEdit}>
            <Image src={`/icons/${isEdit ? "arrow-back" : "pencil"}.svg`} width="32px" height="32px" />
          </Center>
        </>
      )}
    </HStack>
  );
};

export default MenuBar;
