import { StateCreator } from "zustand";
import { ShowPasswordSliceProps } from "~types";

const showPasswordSlice: StateCreator<
  ShowPasswordSliceProps,
  [],
  [],
  ShowPasswordSliceProps
> = (set) => ({
  showPassword: false,
  setShowPassword: (showPassword: boolean) =>
    set({ showPassword: showPassword }),
});

export default showPasswordSlice;
