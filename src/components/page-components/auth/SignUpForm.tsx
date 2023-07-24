import Button from "@/components/common/Button";
import Input from "@/components/common/input/Input";
import { parseError } from "@/utils/functions/errorParser";
import { signUp } from "@/utils/redux/Auth/AuthActions";
import { AppDispatch } from "@/utils/redux/store";
import { ISignUpUser } from "@/utils/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { stringify } from "querystring";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";


const SignUpForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    setError
  } = useForm<ISignUpUser>();


  const onSubmit: SubmitHandler<ISignUpUser> = async (data) => {
    try {
      const res = await dispatch(signUp(data)).unwrap();

      router.push('/login');
    } catch (error) {
      const errMessage = parseError(error);
      
      if (Array.isArray(errMessage)) {
        errMessage.forEach((err) => {
          setError(err.field, {
            type: "custom",
            message: err.message,
          })
        })
      } else {
        setError("root", {
          type: 'custom',
          message: errMessage.message,
        });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-10 mt-8">
      <span className="text-4xl font-semibold bg-white w-full uppercase">
        SIGN IN
      </span>
      <span className="text-red-400 mt-4">{errors.root && errors.root.message}</span>
      <div className="flex flex-col gap-y-10 mt-8 w-full">
        <div className="grid grid-cols-2 gap-x-10">
          <Input id="firstName" label="First Name" register={register} className="flex flex-col" errors={errors}/>
          <Input id="lastName" label="Last Name" register={register} className="flex flex-col" errors={errors}/>
        </div>
        <Input id="email" type="email" label="Email" register={register} className="flex flex-col" errors={errors}/>
        <Input id="phoneNumber" type="text" label="Phone Number" register={register} className="flex flex-col" errors={errors}/>
        <Input id="password" type="password" label="Password" register={register} className="flex flex-col" errors={errors}/>
        <Input id="confirmPassword" type="password" label="Confirm Password" register={register} className="flex flex-col" errors={errors}/>
      </div>
      <div className="mt-8">
        <Button filled className="w-full">Sign up</Button>
      </div>
      <div className="flex flex-col gap-y-2">
        <span>{"Already have an account?"} <Link href={'/auth/login'} className="underline">Sign in</Link></span>
      </div>
    </form>
  );
}

export default SignUpForm;