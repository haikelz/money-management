import { lorelei } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export function randomAvatar(name: string): string {
  const avatar = createAvatar(lorelei, { seed: name });

  const dataUri = avatar.toDataUriSync();
  return dataUri;
}
