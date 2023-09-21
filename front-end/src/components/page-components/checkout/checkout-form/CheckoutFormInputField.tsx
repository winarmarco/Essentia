import {ChangeEvent, HTMLInputTypeAttribute} from "react";
import {FieldValue, FieldValues, Path, UseFormRegister} from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string | "";
  minLength?: number;
  maxLength?: number;
  min?: number;
  register: UseFormRegister<T>;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CheckoutFormInputField = <T extends object>({
  id,
  label,
  type = "text",
  register,
  required,
  min = 0,
  maxLength = 524288,
  placeholder,
  onChange,
}: InputFieldProps<T>) => {
  return (
    <div className={`flex flex-col`}>
      <label htmlFor={id} className="font-semibold">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        {...register(id, {
          onChange: (e) => {
            if (onChange) {
              onChange(e);
            }
          }
        })}
        type={type}
        min={min}
        maxLength={maxLength}
        className="p-2 px-5 border bord1er-black placeholder-gray-500"
      />
    </div>
  );
};

export default CheckoutFormInputField;
