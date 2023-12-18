"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignInResponse, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, Input, Label } from "~components/ui";
import { signInSchema } from "~lib/utils/schema";

export default function Client() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(): Promise<void> {
    const response = (await signIn("credentials", {
      redirect: false,
      username: getValues("username"),
      password: getValues("password"),
    })) as SignInResponse;

    if (response.error) {
      console.log("Error!");
    } else {
      return router.push("/");
    }
  }

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center items-center"
      >
        <div className="my-8 space-y-3 w-full">
          <div className="flex flex-col">
            <Label
              htmlFor="username or email"
              className="font-semibold mb-1 text-sm"
            >
              Username
            </Label>
            <Input required register={register} type="text" name="username" />
            {errors.username ? <span>{errors.username.message}</span> : null}
          </div>
          <div className="flex flex-col">
            <Label htmlFor="password" className="font-semibold mb-1 text-sm">
              Password
            </Label>
            <Input
              required
              register={register}
              type="password"
              name="password"
            />
            {errors.password ? <span>{errors.password.message}</span> : null}
          </div>
        </div>
        <Button type="submit" aria-label="sign in" className="w-[265px]">
          Sign In
        </Button>
      </form>
      <span className="text-lg font-bold text-center my-1.5">Or</span>
      <Button
        variant="red"
        className="space-x-2 flex justify-center items-center"
        onClick={() => signIn("github")}
      >
        <span>Sign in with Github</span>
        <Image src="/images/github.svg" alt="github" width={28} height={24} />
      </Button>
    </div>
  );
}
