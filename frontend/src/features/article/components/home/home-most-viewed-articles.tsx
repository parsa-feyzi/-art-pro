import Slider from "@/src/components/ui/slider";
import HomeSection from "@/src/components/web/home-components/home-section";
import SectionTitle from "@/src/components/web/section-title";
import SliderActions from "@/src/components/web/slider-actions";
import { Article } from "@/src/lib/types";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

async function HomeMostViewedArticles() {
  const resolve = await fetch(`${baseUrl}/api/articles`, {
    cache: "force-cache",
    next: { tags: ["articles_list"] },
  });
  let articles: Article[] = await resolve.json();
  articles = articles.slice(articles.length - 12, articles.length);

  return (
      <HomeSection title={<SectionTitle secondaryWord="Most viewed" mainWord="articles" />} actions={
        <SliderActions
          nextActionId="most-viewed-articles-swiper-button-next"
          prevActionId="most-viewed-articles-swiper-button-prev"
        />
      }>
        <Slider
          data={articles}
          slidesPerView={1.1}
          spaceBetween={10}
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
          nextActionId="most-viewed-articles-swiper-button-next"
          prevActionId="most-viewed-articles-swiper-button-prev"
        />
      </HomeSection>
  );
}

export default HomeMostViewedArticles;
