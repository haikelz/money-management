import { devtools } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { TypeSliceProps } from "~types";

import typeSlice from "./slices/type.slice";

const useGlobalStore = createWithEqualityFn<TypeSliceProps>()(
  devtools((...set) => ({
    ...typeSlice(...set),
  })),
  shallow
);

export default useGlobalStore;
