import React, {HTMLInputTypeAttribute, InputHTMLAttributes} from "react";
import {FieldErrors, FieldValues, Path, UseFormRegister} from "react-hook-form";
import TextInput from "./TextInput";
import FileInput from "./FileInput";
import CheckboxInput from "./CheckboxInput";
import TextAreaInput from "./TextAreaInput";
import {getProperty} from "dot-prop";
import {twMerge} from "tailwind-merge";
import DropdownInput from "./DropdownInput";

interface InputFieldError {
  field: string;
  message: string;
}

interface InputFieldProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  id: Path<T>;
  type?: HTMLInputTypeAttribute | "textarea";
  register: UseFormRegister<T>;
  error?: string;
}

interface InputComponentProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  id: Path<T>;
  errors: FieldErrors<T>;
  label: string;
  type?: HTMLInputTypeAttribute | "textarea";
  className?: string;
  choice?: {name: string; value: string}[];
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
  choice,
  ...others
}: InputComponentProps<T>) => {
  let InputComponent;
  const errorObject = errors && (getProperty(errors, id) as InputFieldError);
  const errorMessage = errorObject && errorObject.message;

  switch (type) {
    case "textarea":
      InputComponent = (
        <TextAreaInput
          id={id}
          register={register}
          {...others}
          required={required}
          error={errorMessage}
        />
      );
      break;
    case "checkbox":
      InputComponent = (
        <CheckboxInput
          id={id}
          register={register}
          {...others}
          required={required}
          error={errorMessage}
        />
      );
      break;
    case "file":
      InputComponent = (
        <FileInput
          id={id}
          register={register}
          {...others}
          required={required}
          error={errorMessage}
        />
      );
      break;
    case "select":
      InputComponent = (
        <DropdownInput
          id={id}
          register={register}
          type={type}
          choice={choice}
          {...others}
          required={required}
          error={errorMessage}
        />
      );
      break;
    default:
      InputComponent = (
        <TextInput
          id={id}
          register={register}
          type={type}
          {...others}
          required={required}
          error={errorMessage}
        />
      );
  }

  return (
    <div className={twMerge("flex flex-col", className)}>
      <label htmlFor={id} className="font-semibold">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {InputComponent}
      <span className="text-red-400 flex items-center">
        {errorMessage?.toString()}
      </span>
    </div>
  );
};

export default Input;
export type {InputFieldProps, InputComponentProps};
