import {twMerge} from "tailwind-merge";
import {InputFieldProps} from "./Input";

const TextInput = <T extends object>({
  id,
  type,
  required,
  register,
  error,
  ...others
}: InputFieldProps<T>) => {
  const errorClass = error && "border-red-400";
  return (
    <input
      id={id}
      {...register(id)}
      type={type}
      className={twMerge(
        "p-2 px-5 border bord1er-black placeholder-gray-500",
        errorClass
      )}
      {...others}
    />
  );
};

export default TextInput;
