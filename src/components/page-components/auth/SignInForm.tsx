import Input from "@/components/common/input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/common/Button";
import Link from "next/link";
import { ISignInUser } from "@/utils/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { signIn } from "@/utils/redux/Auth/AuthActions";


const SignInForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<ISignInUser>();

  const submitHandler: SubmitHandler<ISignInUser> = (data) => {
    dispatch(signIn(data));
  }
  
  return (
    <form className="w-full flex flex-col gap-y-10 mt-8" onSubmit={handleSubmit(submitHandler)}>
      <span className="text-4xl font-semibold bg-white w-full uppercase">
        SIGN IN
      </span>
      <div className="flex flex-col gap-y-10 mt-8 w-full">
        <Input id="email" label="Email" register={register} className="flex flex-col"/>
        <Input id="password" type="password" label="Password" register={register} className="flex flex-col"/>
      </div>
      <div className="mt-8">
        <Button filled className="w-full">Sign in</Button>
      </div>
      <div className="flex flex-col gap-y-2">
        <span>{"Don't have an account?"} <Link href="/auth/signup" className="underline">Sign up</Link></span>
      </div>
    </form>
  );
};

export default SignInForm