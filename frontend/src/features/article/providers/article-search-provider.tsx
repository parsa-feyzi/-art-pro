"use client";

import { ArticleSearchContext } from "@/src/features/article/context/article-search-context";

import { useMemo, useState } from "react";
import { ArticleSearchContextValue } from "../types/types";

interface Props {
  children: React.ReactNode;
}

function ArticleSearchProvider({ children }: Props) {
  const [searchValue, setSearchValue] = useState("");

  const value: ArticleSearchContextValue = useMemo(
    () => ({ searchValue, setSearchValue }),
    [searchValue]
  );

  return <ArticleSearchContext value={value}>{children}</ArticleSearchContext>;
}

export default ArticleSearchProvider;
