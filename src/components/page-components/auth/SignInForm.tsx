import Input from "@/components/common/input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/common/Button";
import Link from "next/link";
import { ISignInUser } from "@/utils/types";
import { ErrorMessage } from "@/utils/types/Error";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/store";
import { signIn } from "@/utils/redux/Auth/AuthActions";
import { parseError } from "@/utils/functions/errorParser";
import { useRouter } from "next/navigation";
import { UIActions } from "@/utils/redux/UI/UISlice";


const SignInForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
  } = useForm<ISignInUser>();

  const submitHandler: SubmitHandler<ISignInUser> = async (data) => {
    try {
      const res = await dispatch(signIn(data)).unwrap();
    
      router.push('/');
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

  console.log(errors);
  
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
        <Button filled className="w-full">Sign in</Button>
      </div>
      <div className="flex flex-col gap-y-2">
        <span>{"Don't have an account?"} <Link href="/auth/signup" className="underline">Sign up</Link></span>
      </div>
    </form>
  );
};

export default SignInForm