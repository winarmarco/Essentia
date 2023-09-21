import React from "react";
import {InputComponentProps, InputFieldProps} from "./Input";

const DropdownInput = <T extends object>({
  id,
  required,
  register,
  multiple,
  choice,
  ...others
}: InputFieldProps<T> & {choice: InputComponentProps<T>["choice"]}) => {
  return (
    <select id={id} {...register(id)} className="p-2 px-5 border bord1er-black placeholder-gray-500">
      {choice?.map((item) => {
        return (
          <option
            value={item.value}
            key={item.value}
          >
            {item.name}
          </option>
        );
      })}
    </select>
  );
};

export default DropdownInput;
