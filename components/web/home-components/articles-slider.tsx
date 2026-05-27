"use client"

import { Article } from "@/lib/types";
import HomeSection from "./home-section";
import Collapsible from "@/components/ui/collapsible";
import ArticleBox from "../article-box";

interface Props {
  title: string;
  dataList: Article[];
  itemsNumber?: 2 | 3 | 4;
}

function ArticlesSlider({ title, dataList, itemsNumber }: Props) {
  return (
    <HomeSection title={title}>
      <Collapsible itemsNumber={itemsNumber}>
        {dataList.map((article) => (
          <ArticleBox {...article} key={article._id} />
        ))}
      </Collapsible>
    </HomeSection>
  );
}

export default ArticlesSlider;
