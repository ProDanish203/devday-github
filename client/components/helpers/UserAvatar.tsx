import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const UserAvatar = ({ src }: { src: string }) => {
  return (
    <Avatar className="size-7">
      <AvatarImage src={src} />
      <AvatarFallback>...</AvatarFallback>
    </Avatar>
  );
};
