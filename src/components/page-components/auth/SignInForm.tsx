import Input from "@/components/common/input/Input";
import { useForm } from "react-hook-form";
import Button from "@/components/common/Button";
import Link from "next/link";

interface ISignInForm {
  email: string,
  password: string,
}

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<ISignInForm>();


  return (
    <form className="w-full flex flex-col gap-y-10 mt-8">
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
        <span>{"Don't have an account?"} <Link href={'/'} className="underline">Sign up</Link></span>
      </div>
    </form>
  );
};

export default SignInForm