import articles from "@/src/lib/mockApi/articlesData.json";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        // await connectToDatabase();
        // const articles = await Article.find();
        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Filed To Fetch Articles" }, { status: 500 })
    }
}