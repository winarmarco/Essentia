import { twMerge } from "tailwind-merge";
import { InputFieldProps } from "./Input";


const TextAreaInput = <T extends object>({
  id,
  register,
  error,
}: InputFieldProps<T>) => {
  const errorClass = (error) && "border-red-400";

  return <textarea
    cols={30}
    rows={10}
    {...register(id)}
    className={twMerge(`px-2 py-1 border border-gray-600`, errorClass)}
  ></textarea>
};

export default TextAreaInput;