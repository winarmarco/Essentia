import { InputFieldProps } from "./Input";

const CheckboxInput = <T extends object>({
  id,
  required,
  register,
  error,
  ...others
}: InputFieldProps<T>) => {

  return <input type="checkbox" {...register(id)} {...others} />;
};

export default CheckboxInput;