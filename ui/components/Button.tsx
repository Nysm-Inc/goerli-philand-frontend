import { FC } from "react";
import { Center } from "@chakra-ui/react";

const Button: FC<{ icon: JSX.Element; onClick: () => void }> = ({ icon, onClick }) => {
  return (
    <Center w="40px" h="40px" border="1px solid" borderColor="black" bgColor="white" cursor="pointer" onClick={onClick}>
      {icon}
    </Center>
  );
};

export default Button;
