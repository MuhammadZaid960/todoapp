export const getAvatar = (name: string) => {
  // if (!name || name.length < 3 || "") return "You can't add this name";
  if (!name) return;
  const splitName = name.split(" ");
  if (splitName.length == 1) {
    return name.substring(0, 2);
  } else {
    return splitName?.at(0)?.[0] + (splitName?.at(-1)?.[0] ?? "");
  }
};
export interface Iuser {
  id: number;
  userName: string;
  userTask: string;
  isCompleted?: boolean;
  isDeleted?: boolean;
}
