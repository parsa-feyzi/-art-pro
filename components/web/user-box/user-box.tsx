import { User } from "@/lib/types";
import Box from "../../ui/box";
import Skeleton from "../../ui/skeleton";
import ProfileImage from "../../ui/profile-image";
import UserBoxArticleItem from "./user-box-article-item";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Activity } from "react";

function UserBox({ userName, email, profileImage, articles, _id }: User) {
  return (
    <Box className="flex flex-col justify-between">
      <div>
        <div className="flex justify-between gap-4">
          <Link href={`/user/${_id}`} className="flex items-center gap-2">
            <ProfileImage alt={userName} size={40} src={profileImage} />
            <div>
              <div className="font-medium">{userName}</div>
              <div className="text-xs opacity-60">{email}</div>
            </div>
          </Link>
          <div className="flex items-cente justify-start gap-0.5 pt-1.5 text-amber-500">
            <div className="text-[13px] -translate-y-0.75">4</div>
            <Star className="size-3.5 text-amber-500" />
          </div>
        </div>
        <div className="pt-6">
          {articles.slice(0, 3).map((article) => (
            <UserBoxArticleItem {...article} key={article._id} />
          ))}
          <Activity mode={articles.length - 2 ? "visible" : "hidden"}>
            <Link
              href={`/user/${_id}`}
              className="text-xs flex pt-1 items-end gap-1 text-foreground/70 hover:text-primary hover:gap-2 transition-all duration-200"
            >
              <div>and {articles.length - 2} other articles</div>
              <ArrowRight className="size-3.5 translate-y-px" />
            </Link>
          </Activity>
        </div>
      </div>
    </Box>
  );
}

export default UserBox;
