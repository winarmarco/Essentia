import React, {
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";
import {FieldValues, Path, UseFormRegister} from "react-hook-form";
import { twMerge } from "tailwind-merge";

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

const CheckboxInput = <T extends object>({
  id,
  required,
  register,
  ...others
}: InputFieldProps<T>) => {
  return <input type="checkbox" {...register(id)} {...others} />;
};

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

const ProductFormInput = <T extends object>({
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
        <TextAreaInput
          id={id}
          register={register}
          {...others}
          required={required}
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
    </div>
  );
};

export default ProductFormInput;
