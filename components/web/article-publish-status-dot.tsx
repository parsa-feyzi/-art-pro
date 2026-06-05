import { ArticleStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

interface Props {
  status: ArticleStatus;
  className?: ClassNameValue;
}

function ArticlePublishStatusDot({ status, className }: Props) {
  return (
    <span
      className={cn(
        status == "published" ? "bg-primary/50 border border-primary" : "bg-danger/50 border border-danger",
        className,
        "size-2 min-w-2 min-h-2 opacity-60 rounded-full"
      )}
    ></span>
  );
}

export default ArticlePublishStatusDot;
