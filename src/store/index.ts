import { devtools } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { ShowPasswordSliceProps, TypeSliceProps } from "~types";

import showPasswordSlice from "./slices/show-password.slice";
import typeSlice from "./slices/type.slice";

const useGlobalStore = createWithEqualityFn<
  TypeSliceProps & ShowPasswordSliceProps
>()(
  devtools((...set) => ({
    ...typeSlice(...set),
    ...showPasswordSlice(...set),
  })),
  shallow
);

export default useGlobalStore;
