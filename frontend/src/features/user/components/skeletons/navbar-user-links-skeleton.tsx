import Skeleton from "@/src/components/ui/skeleton";


function NavbarUserLinksSkeleton() {
  return (
    <>
      <Skeleton className="h-9 w-9 lg:block hidden" />
      <Skeleton className="h-8 w-8 lg:hidden block" />
    </>
  );
}

export default NavbarUserLinksSkeleton;
