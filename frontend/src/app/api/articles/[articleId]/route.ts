import articles from "@/src/lib/mockApi/articlesData.json";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ articleId: string }>;
}

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { articleId } = await params;
    const article = articles.find(
      (article) => article._id.toString() === articleId
    );
    if (article) {
      return NextResponse.json(article, { status: 200 });
    }
    return NextResponse.json(
      { message: "Can't Found This Article!" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Filed To Fetch Article" },
      { status: 500 }
    );
  }
}
