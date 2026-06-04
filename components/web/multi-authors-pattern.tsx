import ProfileImage from "@/components/ui/profile-image";
import { User } from "@/lib/types";

interface Props {
  authors: User[];
}

function MultiAuthorsPattern({ authors }: Props) {
  return (
    <div className="flex items-center">
      <div className="flex">
        {authors.map(({ userName, profileImage, _id }, index) => (
          <ProfileImage
            alt={userName}
            src={profileImage}
            size={32}
            key={_id + Math.random()}
            className={
              index
                ? "-translate-x-3 border border-background"
                : "border border-background"
            }
          />
        ))}
      </div>
      <div className="text-xs -translate-x-1">
        <div>{authors.length}+</div>
        <div className="text-primary-foreground">authors</div>
      </div>
    </div>
  );
}

export default MultiAuthorsPattern;
