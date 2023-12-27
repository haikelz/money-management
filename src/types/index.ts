import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type TypeProps = "Income" | "Expense";

export type TypeSliceProps = {
  type: TypeProps | null;
  setType: (type: TypeProps) => void;
};

export type DataFromFireStoreProps = QuerySnapshot<DocumentData, DocumentData>;

export type FieldsProps = {
  created_at: string;
  email: string;
  name: string;
  type: TypeProps;
  amount: number;
  description: string;
};

export type ShowPasswordSliceProps = {
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
};
