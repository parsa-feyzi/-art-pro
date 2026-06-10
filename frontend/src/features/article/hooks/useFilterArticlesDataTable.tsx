import { Article } from "@/src/lib/types"
import { useState } from "react"

function useFilterArticlesDataTable(data: Article[]) {
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    const filteredData = data.filter((item) => {
        const categoryMatch =
            categoryFilter === "all" ||
            item.category === categoryFilter

        const statusMatch =
            statusFilter === "all" ||
            item.status === statusFilter

        return categoryMatch && statusMatch
    })
    return { filteredData, categoryFilter, setCategoryFilter, statusFilter, setStatusFilter }
}

export default useFilterArticlesDataTable