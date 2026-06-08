// components/data-table/DataTableActions.tsx
import { Button } from "@/src/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/src/components/ui/tooltip";
import { Article } from "@/src/lib/types";
import { Eye, Trash2, PlayCircle, PencilLine } from "lucide-react";
import Link from "next/link";

interface Props {
  item: Article;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string, title: string) => void;
  onPublish: (id: string, title: string) => void;
}

export function DataTableActions({
  item,
  onEdit,
  onDelete,
  onPublish
}: Props) {
  return (
    <div className="flex justify-end space-x-2">
      {item.status === "draft" && (
        <Button
          size="sm"
          onClick={() => onPublish(item._id.toString(), item.title)}
          className="gap-1"
        >
          <PlayCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Publish</span>
        </Button>
      )}
      {item.status === "published" && (
        <Link href={`/blog/${item._id}`}>
          <Button
            size="sm"
            variant="outline"
            className="gap-1 sm:px-4! px-0"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">View</span>
          </Button>
        </Link>
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon-sm"
            variant="outline"
            onClick={() =>
              onEdit(item._id.toString(), item.title)
            }
            className="text-cyan-700 dark:text-cyan-600 hover:text-white dark:hover:text-white hover:bg-cyan-700 dark:hover:bg-cyan-600"
          >
            <PencilLine className="size-4!" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="opacity-90">
          <p>edit</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon-sm"
            variant="outline"
            onClick={() =>
              onDelete(item._id.toString(), item.title)
            }
            className="text-rose-700 dark:text-rose-600 hover:text-white dark:hover:text-white hover:bg-rose-700 dark:hover:bg-rose-600"
          >
            <Trash2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="opacity-90">
          <p>delete</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}