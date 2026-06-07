"use client"

import { Article } from "@/src/lib/types";

import Collapsible from "@/src/components/ui/collapsible";
import HomeSection from "@/src/components/web/home-components/home-section";
import ArticleBox from "./article-box";


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
