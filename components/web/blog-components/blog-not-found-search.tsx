import { LucideNotepadText } from "lucide-react";

function BlogNotFoundSearch() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 my-[19vh] opacity-20">
      <LucideNotepadText className="size-52 opacity-60" />
      <p className="text-3xl font-bold">
        Con't Found Any Article By This Title :(
      </p>
    </div>
  );
}

export default BlogNotFoundSearch;
