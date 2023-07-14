import { InputFieldProps } from "./Input";

const TextInput = <T extends object>({
  id,
  type,
  required,
  register,
  ...others
}: InputFieldProps<T>) => (
  <>
    <input
      id={id}
      {...register(id)}
      type={type}
      className="p-2 px-5 border bord1er-black placeholder-gray-500"
      {...others}
    />
  </>
);

export default TextInput;