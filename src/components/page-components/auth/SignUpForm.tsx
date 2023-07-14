import Button from "@/components/common/Button";
import Input from "@/components/common/input/Input";
import Link from "next/link";
import { stringify } from "querystring";
import { SubmitHandler, useForm } from "react-hook-form";

interface ISignUpForm {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  password: string,
  confirmPassword: string,
}


const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<ISignUpForm>();


  const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        body: JSON.stringify({user: data}),
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const resData = await res.json();
      console.log(resData);
    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-10 mt-8">
      <span className="text-4xl font-semibold bg-white w-full uppercase">
        SIGN IN
      </span>
      <div className="flex flex-col gap-y-10 mt-8 w-full">
        <div className="grid grid-cols-2 gap-x-10">
          <Input id="firstName" label="First Name" register={register} className="flex flex-col"/>
          <Input id="lastName" label="Last Name" register={register} className="flex flex-col"/>
        </div>
        <Input id="email" type="email" label="Email" register={register} className="flex flex-col"/>
        <Input id="phoneNumber" type="text" label="Phone Number" register={register} className="flex flex-col"/>
        <Input id="password" type="password" label="Password" register={register} className="flex flex-col"/>
        <Input id="confirmPassword" type="password" label="Confirm Password" register={register} className="flex flex-col"/>
      </div>
      <div className="mt-8">
        <Button filled className="w-full">Sign up</Button>
      </div>
      <div className="flex flex-col gap-y-2">
        <span>{"Already have an account?"} <Link href={'/auth/login'} className="underline">Sign up</Link></span>
      </div>
    </form>
  );
}

export default SignUpForm;