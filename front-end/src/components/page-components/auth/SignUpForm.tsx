import * as z from "zod";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/input/Input";
import Loading from "@/components/shared/loading/Loading";
import {UserSchema} from "@/utils/types/user";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import { signUp } from "@/utils/actions/user-action";

const SignUpSchema = UserSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
})
  .extend({
    password: z
      .string()
      .min(8, {message: "Password must at least contain 8 character"}),
    confirmPassword: z
      .string()
      .min(1, {message: "Confirm password must not be empty"}),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password and confirm password do not match!",
    path: ["confirmPassword"],
  });
export type ISignUpSchema = z.infer<typeof SignUpSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
  } = useForm<ISignUpSchema>({resolver: zodResolver(SignUpSchema)});

  const onSubmit: SubmitHandler<ISignUpSchema> = async (data) => {
    setIsLoading(true);
    try {
      const res = await signUp(data);

      router.push("/login");
    } catch (error: any) {
      const errorData = await JSON.parse(error.message);
      if (errorData.details) {
        errorData.details.errors.forEach((data: any) => {
          const { path, msg } = data;
          setError(path.split('.')[1], {message: msg});
        })
      }
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-y-10 mt-8"
    >
      <span className="text-4xl font-semibold bg-white w-full uppercase">
        SIGN IN
      </span>
      <span className="text-red-400 mt-4">
        {errors.root && errors.root.message}
      </span>
      <div className="flex flex-col gap-y-10 mt-8 w-full">
        <div className="grid grid-cols-2 gap-x-10">
          <Input
            id="firstName"
            label="First Name"
            register={register}
            className="flex flex-col"
            errors={errors}
          />
          <Input
            id="lastName"
            label="Last Name"
            register={register}
            className="flex flex-col"
            errors={errors}
          />
        </div>
        <Input
          id="email"
          type="email"
          label="Email"
          register={register}
          className="flex flex-col"
          errors={errors}
        />
        <Input
          id="phoneNumber"
          type="text"
          label="Phone Number"
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
        <Input
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          register={register}
          className="flex flex-col"
          errors={errors}
        />
      </div>
      <div className="mt-8">
        <Button filled className="w-full h-10">
          {isLoading ? <Loading className="text-white" /> : "Sign up"}
        </Button>
      </div>
      <div className="flex flex-col gap-y-2">
        <span>
          {"Already have an account?"}{" "}
          <Link href={"/auth/login"} className="underline">
            Sign in
          </Link>
        </span>
      </div>
    </form>
  );
};

export default SignUpForm;
