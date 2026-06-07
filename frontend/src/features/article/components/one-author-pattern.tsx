import ProfileImage from "@/src/components/ui/profile-image";
import { User } from "@/src/lib/types";
import { cn } from "@/src/lib/utils";
import { ClassNameValue } from "tailwind-merge";

type Props = Pick<User, 'userName' | 'email' | 'profileImage'> & { className?: ClassNameValue }

function OneAuthorPattern({ userName, email, profileImage, className }: Props) {
  return (
    <div className={cn("flex gap-2 items-center", className)}>
      <ProfileImage
        alt={userName}
        src={profileImage}
        size={30}
      />
      <div>
        <div className="text-xs font-medium">{userName}</div>
        <div className="text-[11px] text-tertiary">{email}</div>
      </div>
    </div>
  );
}

export default OneAuthorPattern;
