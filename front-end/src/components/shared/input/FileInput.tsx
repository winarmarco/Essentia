import { InputFieldProps } from "./Input";

const FileInput = <T extends object>({
  id,
  required,
  register,
  multiple,
  ...others
}: InputFieldProps<T>) => (
  <>
    <input type="file" {...register(id)} multiple={multiple} {...others} />
  </>
);

export default FileInput;