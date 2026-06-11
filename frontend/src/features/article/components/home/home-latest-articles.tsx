
import { Article } from "@/src/lib/types";
import HomeSection from "@/src/components/web/home-components/home-section";
import Slider from "@/src/components/ui/slider";
import SliderActions from "@/src/components/web/slider-actions";
import SectionTitle from "@/src/components/web/section-title";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

async function HomeLatestArticles() {
  const resolve = await fetch(`${baseUrl}/api/articles`, {
    cache: "force-cache",
    next: { tags: ["articles_list"] },
  });
  let articles: Article[] = await resolve.json();
  articles = articles.slice(articles.length - 12, articles.length);

  return (
    <HomeSection
      title={<SectionTitle secondaryWord="Latest" mainWord="articles" />}
      actions={
        <SliderActions
          nextActionId="latest-articles-swiper-button-next"
          prevActionId="latest-articles-swiper-button-prev"
        />
      }
    >
      <Slider
        data={articles}
        slidesPerView={1.15}
        spaceBetween={12}
        breakpoints={{
          640: {
            slidesPerView: 2.3,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 16,
          },
        }}
        nextActionId="latest-articles-swiper-button-next"
        prevActionId="latest-articles-swiper-button-prev"
      />
    </HomeSection>
  );
}

export default HomeLatestArticles;
