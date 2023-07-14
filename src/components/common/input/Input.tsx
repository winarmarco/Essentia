import React, {HTMLInputTypeAttribute, InputHTMLAttributes} from "react";
import {FieldValues, Path, UseFormRegister} from "react-hook-form";
import TextInput from "./TextInput";
import FileInput from "./FileInput";
import CheckboxInput from "./CheckboxInput";
import TextAreaInput from "./TextAreaInput";

interface InputFieldProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  id: Path<T>;
  type?: HTMLInputTypeAttribute | "textarea";
  register: UseFormRegister<T>;
}

interface InputComponentProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  id: Path<T>;
  label: string;
  type?: HTMLInputTypeAttribute | "textarea";
  className: string;
  register: UseFormRegister<T>;
}


const Input = <T extends object>({
  id,
  label,
  type,
  required,
  className,
  register,
  ...others
}: InputComponentProps<T>) => {
  let InputComponent;

  switch (type) {
    case "textarea":
      InputComponent = (
        <TextAreaInput id={id} register={register} {...others} required={required} />
      );
      break;
    case "checkbox":
      InputComponent = (
        <CheckboxInput id={id} register={register} {...others} required={required}
        />
      );
      break;
    case "file":
      InputComponent = (
        <FileInput id={id} register={register} {...others} required={required}
        />
      );
      break;
    default:
      InputComponent = (
        <TextInput id={id} register={register} type={type} {...others} required={required}
        />
      );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="font-semibold">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {InputComponent}
    </div>
  );
};

export default Input;
export type {InputFieldProps};
