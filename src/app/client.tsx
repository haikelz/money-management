"use client";

import { deleteDoc, doc } from "firebase/firestore";
import { TrashIcon } from "lucide-react";
import { db } from "~lib/utils/firebase";

export function DeleteButton({ id }: { id: string }) {
  async function deleteField(): Promise<void> {
    try {
      const reference = doc(db, "data", id);
      await deleteDoc(reference);

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button type="button" aria-label="delete" onClick={deleteField}>
      <TrashIcon size={20} />
    </button>
  );
}
