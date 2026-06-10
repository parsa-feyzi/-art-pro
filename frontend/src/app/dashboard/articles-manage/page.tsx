import { Article } from "@/src/lib/types"
//
import { DashboardArticlesManageTable } from "@/src/features/article/components/dashboard/dashboard-articles-manage-table";
//

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default async function ArticleManagePage() {
    const resolve = await fetch(`${baseUrl}/api/articles`, {
        cache: "force-cache",
        next: { tags: ["articles_list"] },
    });
    const articles: Article[] = await resolve.json();

    return (
        <DashboardArticlesManageTable articles={articles} />
    );
}