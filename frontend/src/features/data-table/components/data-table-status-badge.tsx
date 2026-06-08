import { cn } from "@/src/lib/utils";

interface Props {
  status: "published" | "draft";
}

export function DataTableStatusBadge({ status }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        status === "published"
          ? "bg-green-200/50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      )}
    >
      {status}
    </span>
  );
}