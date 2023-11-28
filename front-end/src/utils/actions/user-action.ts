import { ISignUpSchema } from "@/components/page-components/auth/SignUpForm";

export const signUp = async (body: ISignUpSchema) => {
  const res = await fetch(`http://localhost:3000/signup`, {
    method: "POST",
    body: JSON.stringify({user: body}),
    headers: {
      "Content-Type": "application/json",
    }
  })
  const resData = await res.json();

  if (!res.ok) {
    throw new Error(JSON.stringify(resData));
  }
  
  const { data } = resData;
  return data;
}