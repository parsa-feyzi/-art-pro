import ProfileImage from "@/components/ui/profile-image";
import { User } from "@/lib/types";

type Props = Pick<User, 'userName' | 'email' | 'profileImage'>

function OneAuthorPattern({ userName, email, profileImage }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <ProfileImage
        alt={userName}
        src={profileImage}
        size={30}
      />
      <div>
        <div className="text-xs font-medium">{userName}</div>
        <div className="text-[11px] opacity-50">{email}</div>
      </div>
    </div>
  );
}

export default OneAuthorPattern;
