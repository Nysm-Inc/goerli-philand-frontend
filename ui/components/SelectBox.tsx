import { Select } from "@chakra-ui/react";
import { FC } from "react";

type Option = {
  label: string;
  value: string;
};

const SelectBox: FC<{
  options: Option[];
  value: string;
  disabled?: boolean;
  placeholder?: string;
  handleChange: (value: string) => void;
}> = ({ options, value, placeholder, disabled, handleChange }) => {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={(e) => handleChange(e.target.value)}
      cursor="pointer"
      _focus={{ outline: "none" }}
      _focusVisible={{ outline: "none" }}
    >
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default SelectBox;
