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
        status == "draft" ? "bg-primary" : "bg-amber-500",
        className,
        "size-2 min-w-2 min-h-2 opacity-50 rounded-full"
      )}
    ></span>
  );
}

export default ArticlePublishStatusDot;
