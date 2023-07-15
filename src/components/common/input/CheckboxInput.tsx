import { InputFieldProps } from "./Input";

const CheckboxInput = <T extends object>({
  id,
  required,
  register,
  ...others
}: InputFieldProps<T>) => {
  return <input type="checkbox" {...register(id)} {...others} />;
};

export default CheckboxInput;