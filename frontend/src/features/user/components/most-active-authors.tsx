import Slider from "@/src/components/ui/slider"
import HomeSection from "@/src/components/web/home-components/home-section"
import SectionTitle from "@/src/components/web/section-title"
import { User } from "@/src/lib/types"
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

async function HomeMostActiveAuthors() {
  const resolve = await fetch(`${baseUrl}/api/users`, { cache: 'no-store', next: { tags: ['users_list'] } })
  const users: User[] = await resolve.json()

  return (
      <HomeSection title={<SectionTitle secondaryWord="Most active" mainWord="authors" />}>
        <Slider
          data={users}
          slidesPerView={1.2}
          spaceBetween={12}
          breakpoints={{
            640: {
              slidesPerView: 2.1,
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 3.2,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 4.2,
              spaceBetween: 16,
            },
          }}
          isCenteredSlides
          isAutoRail
          nextActionId="most-active-authors-swiper-button-next"
          prevActionId="most-active-authors-swiper-button-prev"
        />
      </HomeSection>
  )
}

export default HomeMostActiveAuthors