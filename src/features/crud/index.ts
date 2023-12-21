import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "~lib/utils/firebase";
import { DataFromFireStoreProps, FieldsProps } from "~types";

export async function getData(
  name: string,
  email: string
): Promise<DataFromFireStoreProps | undefined> {
  try {
    const reference = collection(db, "data");
    let q = query(reference, where("email", "==", email));
    q = query(reference, where("name", "==", name));

    const response = await getDocs(q);
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function postData(data: FieldsProps): Promise<void> {
  try {
    const { type, name, email, created_at, amount, description } = data;

    await addDoc(collection(db, "data"), {
      email: email,
      name: name,
      type: type,
      created_at: created_at,
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
  data: Omit<FieldsProps, "email" | "name" | "created_at">
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
