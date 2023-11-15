"use client";
import {z} from "zod";
import Input from "@/components/shared/input/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "@/components/shared/Button";
import Link from "next/link";
import Loading from "@/components/shared/loading/Loading";
import {signIn} from "next-auth/react";
import {UserSchema} from "@/utils/types/user";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {SIGNUP_PAGE_URL} from "@/utils/constants";

const SignInSchema = UserSchema.pick({email: true}).extend({
  password: z.string().min(1, {message: "Password is required"}),
});
type ISignIn = z.infer<typeof SignInSchema>;

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
  } = useForm<ISignIn>({resolver: zodResolver(SignInSchema)});
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler: SubmitHandler<ISignIn> = async (data, e) => {
    e?.preventDefault();
    try {
      const {email, password} = data;
      setIsLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res?.ok) {
        const errorMessage =
          res?.error || "No user found with that credentials";
        throw new Error(errorMessage);
      }
      router.push("/");
    } catch (error: any) {
      setError("root", {message: error.message});
    }
    setIsLoading(false);
  };

  return (
    <form
      className="w-full flex flex-col gap-y-10 mt-8"
      onSubmit={handleSubmit(submitHandler)}
    >
      <span className="text-4xl font-semibold bg-white w-full uppercase">
        SIGN IN
      </span>
      <span className="text-red-400 mt-4">
        {errors.root && errors.root.message}
      </span>
      <div className="flex flex-col gap-y-10 w-full">
        <Input
          id="email"
          label="Email"
          register={register}
          className="flex flex-col"
          errors={errors}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          register={register}
          className="flex flex-col"
          errors={errors}
        />
      </div>
      <div className="mt-8">
        <Button filled className="w-full h-10">
          {isLoading ? <Loading className="text-white" /> : "Sign in"}
        </Button>
      </div>
      <div className="flex flex-col gap-y-2">
        <span>
          {"Don't have an account? "}
          <Link href={SIGNUP_PAGE_URL} className="underline">
            Sign up
          </Link>
        </span>
      </div>
    </form>
  );
};

export default SignInForm;
