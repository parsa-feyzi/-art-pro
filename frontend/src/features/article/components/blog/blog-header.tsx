"use client";

import { Button } from "@/src/components/ui/button";
import { BrushCleaning, Search } from "lucide-react";
import { ChangeEvent, useEffect, useEffectEvent, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/src/components/ui/input";
import { useArticleSearchStore } from "../../store/useArticleSearchStore";

function BlogHeader() {
  const { searchValue, updateSearchValue, clearSearchValue } = useArticleSearchStore();
  const [isSearched, setIsSearched] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onInter = useEffectEvent(() => {
    searchValue && setIsSearched(true);
  })

  useEffect(() => {
    onInter()
  }, []);

  useEffect(() => {
    isSearched && setSearchParams();
  }, [searchValue, isSearched]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const articleSearchParamsValue = params.get("title");
    if (!articleSearchParamsValue) {
      clearSearchValue();
    }
  }, [pathname]);

  const setSearchParams = () => {
    // get searchParams from url
    const params = new URLSearchParams(searchParams.toString());
    // set a value in searchParams
    params.set("title", searchValue);
    // create new url whit pathname (/blog) + ? + new searchParams
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearSearchParams = () => {
    // get searchParams from url
    const params = new URLSearchParams(searchParams.toString());
    // delete a value in searchParams
    params.delete("title");
    // create new url whit pathname (/blog) + deleted searchParams
    router.push(`${pathname}?${params.toString()}`);
    // make searchValue state empty
    searchValue && clearSearchValue();
    //
    setIsSearched(false);
  };

  const searchValueAction = (e: ChangeEvent<HTMLInputElement>) =>
    updateSearchValue(e.target.value);

  const searchBtnClickHandler = () => {
    searchValue && setIsSearched(true);
  };

  return (
    <div className="mb-4 sticky sm:top-0 top-14 left-0 z-20 bg-background sm:py-4 py-2 sm:px-2">
      <div className="sm:p-0 p-1.5 sm:border-none border border-input rounded-lg md:grid md:grid-cols-12 flex items-center gap-4 justify-between">
        <Input
          value={searchValue}
          onChange={(e) => searchValueAction(e)}
          className="sm:py-5.5! py-3! sm:focus-visible:ring-[1px] lg:col-span-8 md:col-span-7 sm:border border-0 focus-visible:ring-0 sm:text-base text-sm"
          placeholder="What article are you looking for?"
        />
        <div className="flex justify-end gap-4 lg:col-span-4 md:col-span-5">
          <Button
            disabled={!Boolean(searchValue)}
            size={"xl"}
            variant={"secondary"}
            onClick={clearSearchParams}
            className="md:inline-flex hidden"
          >
            Clear
            <BrushCleaning />
          </Button>
          <Button
            disabled={!Boolean(searchValue)}
            size={"xl"}
            onClick={searchBtnClickHandler}
            className="sm:inline-flex hidden"
          >
            <span>Search in Articles</span>
            <Search />
          </Button>
          <Button
            disabled={!Boolean(searchValue)}
            size={"icon-lg"}
            onClick={searchBtnClickHandler}
            className="sm:hidden inline-flex"
          >
            <Search />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BlogHeader;
