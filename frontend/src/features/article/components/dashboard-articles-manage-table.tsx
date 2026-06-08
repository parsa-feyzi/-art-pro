"use client"

import { Article } from "@/src/lib/types"
import { Suspense } from "react"
import { DataTable } from "../../data-table/components/data-table"
import { toast } from "sonner"

interface Props {
  articles: Article[]
}

export function DashboardArticlesManageTable({ articles }: Props) {
  const handleEdit = (id: string, title: string) => {
    toast.info(`Editing: ${title}`);
  };

  const handleDelete = (id: string, title: string) => {
    toast.error(`Deleted: ${title}`);
  };

  const handlePublish = (id: string, title: string) => {
    toast.success(`Published: ${title}`);
  };

  return (
    <main className="container mx-auto">
      <Suspense fallback="loading...">
        <DataTable
          data={articles}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPublish={handlePublish}
          config={{
            itemsPerPage: 8,
            enableSorting: true,
            enableFiltering: true,
          }}
        />
      </Suspense>
    </main>
  );
}
