import React, {HTMLInputTypeAttribute, InputHTMLAttributes} from "react";
import {FieldErrors, FieldValues, Path, UseFormRegister} from "react-hook-form";
import TextInput from "./TextInput";
import FileInput from "./FileInput";
import CheckboxInput from "./CheckboxInput";
import TextAreaInput from "./TextAreaInput";

interface InputFieldProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  id: Path<T>;
  type?: HTMLInputTypeAttribute | "textarea";
  register: UseFormRegister<T>;
  error: boolean;
}

interface InputComponentProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  id: Path<T>;
  errors: FieldErrors<T>;
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
  errors,
  register,
  ...others
}: InputComponentProps<T>) => {
  let InputComponent;
  const errorMessage = errors && errors[id]?.message;

  switch (type) {
    case "textarea":
      InputComponent = (
        <TextAreaInput id={id} register={register} {...others} required={required} error={Boolean(errorMessage)} />
      );
      break;
    case "checkbox":
      InputComponent = (
        <CheckboxInput id={id} register={register} {...others} required={required} error={Boolean(errorMessage)}
        />
      );
      break;
    case "file":
      InputComponent = (
        <FileInput id={id} register={register} {...others} required={required} error={Boolean(errorMessage)}
        />
      );
      break;
    default:
      InputComponent = (
        <TextInput id={id} register={register} type={type} {...others} required={required} error={Boolean(errorMessage)}
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
      <span className="text-red-400">{errorMessage?.toString()}</span>
    </div>
  );
};

export default Input;
export type {InputFieldProps};
