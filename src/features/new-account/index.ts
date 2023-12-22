import {
  addDoc,
  and,
  collection,
  doc,
  getDocs,
  or,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { CREATED_AT } from "~lib/utils/constants";
import { db } from "~lib/utils/firebase";
import { DataFromFireStoreProps, FieldsProps } from "~types";

export async function getUserAccount(
  name: string,
  password: string
): Promise<DataFromFireStoreProps | undefined> {
  try {
    const reference = collection(db, "accounts");
    const q = query(
      reference,
      or(where("name", "==", name), where("password", "==", password))
    );

    const response = await getDocs(q);
    return response;
  } catch (err) {
    console.error(err);
  }
}

type NewAccountProps = Omit<
  FieldsProps,
  "type" | "amount" | "description" | "created_at"
> & {
  password: string;
  image: string;
};

export async function createNewAccount(data: NewAccountProps): Promise<void> {
  const { email, name, password, image } = data;

  try {
    await addDoc(collection(db, "accounts"), {
      email: email,
      name: name,
      password: password,
      image: image,
      created_at: CREATED_AT,
    });
  } catch (err) {
    console.error(err);
  }
}

export async function updateImageAccount(
  id: string,
  newImage: string
): Promise<void> {
  try {
    const reference = doc(db, "accounts", id);

    await updateDoc(reference, {
      image: newImage,
    });
  } catch (err) {
    console.error(err);
  }
}

export async function getUserId(
  name: string,
  email: string
): Promise<string | undefined> {
  try {
    const reference = collection(db, "accounts");
    const q = query(
      reference,
      and(where("name", "==", name), where("email", "==", email))
    );

    const userAccount = await getDocs(q);
    const id = userAccount.docs.map((item) => item.id);

    return id[0];
  } catch (err) {
    console.error(err);
  }
}
