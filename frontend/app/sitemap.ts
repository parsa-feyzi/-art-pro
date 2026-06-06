import { Article } from "@/lib/types";
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const resolve = await fetch(`${baseUrl}/api/articles`, { cache: "force-cache", next: { tags: ['articles_list'] } });
    const articles: Article[] = await resolve.json();

    const articleEntries: MetadataRoute.Sitemap = articles.map(({ _id, _updatedAt }) => ({
        url: `${baseUrl}/blog/${_id}`,
        lastModified: _updatedAt
    }))

    return [
        {
            url: `${baseUrl}/`
        },
        {
            url: `${baseUrl}/about-us`
        },
        {
            url: `${baseUrl}/blog`
        },
        ...articleEntries
    ]
}