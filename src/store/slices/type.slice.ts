import { StateCreator } from "zustand";
import { TypeProps, TypeSliceProps } from "~types";

const typeSlice: StateCreator<TypeSliceProps, [], [], TypeSliceProps> = (
  set
) => ({
  type: "Income",
  setType: (type: TypeProps) => set({ type: type }),
});

export default typeSlice;
