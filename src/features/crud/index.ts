import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "~lib/utils/firebase";
import { DataFromFireStoreProps, FieldsProps } from "~types";

export async function getData(): Promise<DataFromFireStoreProps | undefined> {
  try {
    const response = await getDocs(collection(db, "data"));
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function postData(data: FieldsProps): Promise<void> {
  try {
    const { type, username, email, createdAt, amount, description } = data;

    await addDoc(collection(db, "data"), {
      email: email,
      username: username,
      type: type,
      createdAt: createdAt,
      amount: amount,
      description: description,
    });
  } catch (err) {
    console.error(err);
  }
}

export async function deleteData(id: string): Promise<void> {
  try {
    const reference = doc(db, "data", id);
    await deleteDoc(reference);
  } catch (err) {
    console.error(err);
  }
}

export async function patchData(
  id: string,
  data: Omit<FieldsProps, "email" | "username" | "createdAt">
): Promise<void> {
  try {
    const { type, amount, description } = data;

    const reference = doc(db, "data", id);

    await updateDoc(reference, {
      type: type,
      amount: amount,
      description: description,
    });
  } catch (err) {
    console.error(err);
  }
}
