import { ArticleSearchContextValue } from "@/lib/types";
import { createContext, useContext } from "react";

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
