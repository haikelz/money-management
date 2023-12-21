import format from "date-fns/format";
import id from "date-fns/locale/id";
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "~lib/utils/firebase";
import { FieldsProps } from "~types";

export async function getAllUsersAccount(
  email: string,
  name: string,
  password: string
) {
  try {
    // const response = await getDocs()
  } catch (err) {
    console.error(err);
  }
}

export async function getUserAccount(
  name: string,
  password: string
): Promise<QuerySnapshot<DocumentData, DocumentData> | undefined> {
  try {
    const reference = collection(db, "accounts");
    let q = query(reference, where("email", "==", name));
    q = query(reference, where("password", "==", password));

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

const created_at = format(new Date(), "cccc, dd MMMM yyyy, k:m:s", {
  locale: id,
});

export async function createNewAccount(data: NewAccountProps): Promise<void> {
  const { email, name, password, image } = data;

  try {
    await addDoc(collection(db, "accounts"), {
      email: email,
      name: name,
      password: password,
      image: image,
      created_at: created_at,
    });
  } catch (err) {
    console.error(err);
  }
}

export async function uploadImageAccount(
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
