'use client'

import { createContext, useContext } from "react";
import { ArticleSearchContextValue } from "../types/types";

// context
const ArticleSearchContext = createContext<
  ArticleSearchContextValue | undefined
>(undefined);

// hook
function useArticleSearchContext() {
  const contextValue = useContext(ArticleSearchContext);
  if (!contextValue)
    throw new Error(
      "useArticleSearchContext must be used within ArticleSearchProvider"
    );
  return contextValue;
}

export { ArticleSearchContext, useArticleSearchContext };
