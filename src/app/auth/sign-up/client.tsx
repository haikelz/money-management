"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Input, Label } from "~components/ui";
import { getUserAccount } from "~features/new-account";
import { signInSchema } from "~lib/utils/schema";
import { trpc } from "~lib/utils/trpc/client";
import useGlobalStore from "~store";
import { DataFromFireStoreProps } from "~types";

export default function Client() {
  const router = useRouter();
  const queryClient = useQueryClient();

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
      email: "",
      name: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const { mutate } = trpc.createNewAccount.useMutation({
    mutationKey: ["create-new-account"],
    onSettled: async () =>
      await queryClient.invalidateQueries({
        queryKey: ["create-new-account"],
        exact: true,
      }),
    onSuccess: () => {
      toast("Berhasil membuat akun!");
      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 1000);
    },
    onError: () => toast("Terjadi masalah saat pembuatan akun! Coba lagi"),
  });

  async function onSubmit(): Promise<void> {
    const userAccount = (await getUserAccount(
      getValues("name"),
      getValues("password")
    )) as DataFromFireStoreProps;

    const existingName = userAccount.docs.map((item) => item.data().name)[0];
    const existingPassword = userAccount.docs.map(
      (item) => item.data().password
    )[0];

    if (
      existingName === getValues("name") &&
      existingPassword === getValues("password")
    ) {
      toast(
        "Email dan password yang kamu masukkan sudah dipakai! Silahkan memakai Email dan kombinasi Password yang lain"
      );
      return;
    } else if (existingName === getValues("name")) {
      toast(
        "Email yang kamu masukkan sudah dipakai! Silahkan memakai Email yang lain"
      );
      return;
    } else if (existingPassword === getValues("password")) {
      toast(
        "Password yang kamu masukkan sudah dipakai! Silahkan memakai kombinasi Password yang lain"
      );
      return;
    }

    mutate({
      email: getValues("email"),
      name: getValues("name"),
      password: getValues("password"),
      image: "",
    });
  }

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center items-center"
      >
        <div className="my-8 space-y-3 w-full">
          <div className="flex flex-col">
            <Label htmlFor="email" className="font-semibold mb-1 text-sm">
              Email
            </Label>
            <Input register={register} type="text" name="email" />
            {errors.email ? (
              <span className="mt-0.5">{errors.email.message}</span>
            ) : null}
          </div>
          <div className="flex flex-col">
            <Label htmlFor="name" className="font-semibold mb-1 text-sm">
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
          Create your account
        </Button>
      </form>
    </div>
  );
}
