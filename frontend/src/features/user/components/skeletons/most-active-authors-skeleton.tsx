import Collapsible from "@/src/components/ui/collapsible";
import UserBoxSkeleton from "./user-box-skeleton";
import HomeSection from "@/src/components/web/home-components/home-section";
import Skeleton from "@/src/components/ui/skeleton";

function MostActiveAuthorsSkeleton() {
  return (
    <HomeSection title={<Skeleton className="md:h-10 md:w-130 sm:h-8 sm:w-120 h-6 w-96" />}>
      <Collapsible itemsNumber={4}>
        <UserBoxSkeleton className="lg:block hidden" />
        <UserBoxSkeleton className="md:block hidden" />
        <UserBoxSkeleton className="sm:block hidden" />
        <UserBoxSkeleton />
      </Collapsible>
    </HomeSection>
  );
}

export default MostActiveAuthorsSkeleton;
