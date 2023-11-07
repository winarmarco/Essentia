"use client";

import Input from "@/components/shared/input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/shared/Button";
import Link from "next/link";
import { ISignInUser } from "@/utils2/types";
import { ErrorMessage } from "@/utils2/types/Error";
import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/utils2/redux/store";
// import { signIn } from "@/utils2/redux/Auth/AuthActions";
import { parseError } from "@/utils2/functions/errorParser";
import { useRouter } from "next/navigation";
// import { UIActions } from "@/utils2/redux/UI/UISlice";
import Loading from "@/components/shared/loading/Loading";
import { signIn } from "next-auth/react";


const SignInForm = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const auth = useSelector((root: RootState) => root.auth);
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
  } = useForm<ISignInUser>();


  // const submitHandler: SubmitHandler<ISignInUser> = async (data) => {
  //   try {
  //     const res = await dispatch(signIn(data)).unwrap();
    
  //     router.push('/');
  //   } catch (error) {
  //     const errMessage = parseError(error);
      
  //     if (Array.isArray(errMessage)) {
  //       errMessage.forEach((err) => {
  //         setError(err.field, {
  //           type: "custom",
  //           message: err.message,
  //         })
  //       })
  //     } else {
  //       setError("root", {
  //         type: 'custom',
  //         message: errMessage.message,
  //       });
  //     }
  //   }
  // }

  const submitHandler: SubmitHandler<ISignInUser> = async (data, e) => {
    e?.preventDefault();
    try {
      const {email, password} = data;
      console.log(data);
      // console.log(email, password);
      await signIn("credentials", {
        email, password
      })
    } catch (error) {
      
    }
  }

  
  return (
    <form className="w-full flex flex-col gap-y-10 mt-8" onSubmit={handleSubmit(submitHandler)}>
      <span className="text-4xl font-semibold bg-white w-full uppercase">
        SIGN IN
      </span>
      <span className="text-red-400 mt-4">{errors.root && errors.root.message}</span>
      <div className="flex flex-col gap-y-10 w-full">
        <Input id="email" label="Email" register={register} className="flex flex-col" errors={errors}/>
        <Input id="password" type="password" label="Password" register={register} className="flex flex-col" errors={errors}/>
      </div>
      <div className="mt-8">
        <Button filled className="w-full h-10">{false ? <Loading className="text-white"/> : "Sign in"}</Button>
      </div>
      <div className="flex flex-col gap-y-2">
        <span>{"Don't have an account?"} <Link href="/auth/signup" className="underline">Sign up</Link></span>
      </div>
    </form>
  );
};

export default SignInForm