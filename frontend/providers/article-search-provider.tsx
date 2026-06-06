"use client";

import { ArticleSearchContext } from "@/contexts/article-search-context";
import { ArticleSearchContextValue } from "@/lib/types";
import { useMemo, useState } from "react";

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
