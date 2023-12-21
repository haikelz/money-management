"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { SignInResponse, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Input, Label } from "~components/ui";
import { signInSchema } from "~lib/utils/schema";
import useGlobalStore from "~store";

export default function Client() {
  const router = useRouter();

  const { showPassword, setShowPassword } = useGlobalStore((state) => ({
    showPassword: state.showPassword,
    setShowPassword: state.setShowPassword,
  }));

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(): Promise<void> {
    const auth = (await signIn("credentials", {
      redirect: false,
      name: getValues("name"),
      password: getValues("password"),
    })) as SignInResponse;

    if (auth.error) {
      console.log(auth.error);
      toast(
        "Error saat Sign In! Silahkan masukkan name atau passwod yang benar!"
      );
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
              htmlFor="name or email"
              className="font-semibold mb-1 text-sm"
            >
              Username
            </Label>
            <Input register={register} type="text" name="name" />
            {errors.name ? (
              <span className="mt-0.5">{errors.name.message}</span>
            ) : null}
          </div>
          <div className="flex flex-col">
            <Label htmlFor="password" className="font-semibold mb-1 text-sm">
              Password
            </Label>
            <div className="relative w-full flex items-center">
              <Input
                register={register}
                type={showPassword ? "text" : "password"}
                name="password"
                className="relative w-full"
              />
              <button
                type="button"
                aria-label="show password"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4"
              >
                {showPassword ? (
                  <EyeIcon size={20} />
                ) : (
                  <EyeOffIcon size={20} />
                )}
              </button>
            </div>
            {errors.password ? (
              <span className="mt-0.5">{errors.password.message}</span>
            ) : null}
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
