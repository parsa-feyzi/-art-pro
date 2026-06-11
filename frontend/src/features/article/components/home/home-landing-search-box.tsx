"use client";

import { buttonVariants } from "@/src/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useArticleSearchContext } from "../../context/article-search-context";

function HomeLandingSearchBox() {
  const { searchValue, setSearchValue } = useArticleSearchContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const articleSearchParamsValue = params.get("title");
    if (!articleSearchParamsValue) {
      setSearchValue("");
    }
  }, [pathname]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="lg:w-3/5 sm:w-5/6 w-11/12 lg:max-w-200 sm:max-w-185 max-w-100 lg:mt-28 md:mt-24 mt-16 mx-auto flex items-center md:p-2.5 p-1.5 rounded-lg bg-accent/50 dark:bg-accent/25 border border-input">
      <input
        value={searchValue}
        onChange={(e) => changeHandler(e)}
        placeholder="What article are you looking for?"
        className="w-full p-2 outline-none border-none bg-none lg:text-base md:text-sm text-xs"
        type="text"
        autoComplete="off"
      />
      <Link href={`blog/?title=${searchValue}`} className={`${buttonVariants({ size: "xl" })} md:inline-flex! hidden!`}>
        <span className="translate-y-px">Search in Articles</span>
        <Search />
      </Link>
      <Link href={`blog/?title=${searchValue}`} className={`${buttonVariants({ size: "lg" })} md:hidden! sm:inline-flex! hidden!`}>
        <span className="translate-y-px text-xs">Search <span className="sm:inline-block hidden">in Articles</span></span>
        <Search className="size-4" />
      </Link>
      <Link href={`blog/?title=${searchValue}`} className={`${buttonVariants({ size: "icon" })} sm:hidden! inline-flex!`}>
        <Search className="size-4" />
      </Link>
    </div>
  );
}

export default HomeLandingSearchBox;
