import { InputFieldProps } from "./Input";


const TextAreaInput = <T extends object>({
  id,
  register,
}: InputFieldProps<T>) => (
  <textarea
    cols={30}
    rows={10}
    {...register(id)}
    className="px-2 py-1 border border-gray-600"
  ></textarea>
);

export default TextAreaInput;