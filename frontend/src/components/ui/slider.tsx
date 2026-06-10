"use client"

import { Activity, useRef } from 'react';
//
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
//
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/mousewheel';
import { Article, User } from '@/src/lib/types';
import ArticleBox from '@/src/features/article/components/article-box';
import UserBox from '@/src/features/user/components/user-box';
//
import "@/src/styles/swiper.css"

interface Breakpoint {
    [width: number]: SwiperOptions;
    [ratio: string]: SwiperOptions;
}

interface Props<T extends (Article | User)> {
    data: T[];
    slidesPerView: number
    spaceBetween: number
    breakpoints?: Breakpoint
    isCenteredSlides?: boolean
    isAutoRail?: boolean
    nextActionId?: string
    prevActionId?: string
}

function Slider<T extends (Article | User)>({ data, slidesPerView, spaceBetween, breakpoints, isCenteredSlides, isAutoRail, nextActionId, prevActionId }: Props<T>) {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div className={cn(isAutoRail && "auto-rail", "mx-auto")}>
            <Swiper
                // static in both states
                modules={[Navigation, Mousewheel, Autoplay]}
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
                breakpoints={breakpoints}
                loop={true}
                centeredSlides={isCenteredSlides}
                mousewheel={true}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                // dynamic (change by isAutoRail state)
                speed={isAutoRail ? 5000 : undefined}
                autoplay={isAutoRail ? {
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                    stopOnLastSlide: false,
                    waitForTransition: true,
                } : { pauseOnMouseEnter: true }}
                navigation={isAutoRail ? undefined : {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }}
                onBeforeInit={
                    isAutoRail ?
                        (swiper) => {
                            swiperRef.current = swiper;
                        } :
                        undefined
                }
                className='mySwiper flex items-stretch!'
            >
                {
                    (data[0] as Article).authors
                        ?
                        data.map((item) => (
                            <SwiperSlide className='h-auto! flex-col flex' key={item._id}>
                                <ArticleBox {...(item as Article)} className="flex-1 h-full w-full" />
                            </SwiperSlide>
                        ))
                        :
                        data.map((item) => (
                            <SwiperSlide className='h-auto! flex-col flex' key={item._id + (item as User).userName}>
                                <UserBox {...(item as User)} className="flex-1 h-full w-full" />
                            </SwiperSlide>
                        ))
                }
                {isAutoRail ||
                    <>
                        <input id={nextActionId} className="swiper-button-next size-0!" type='button' />
                        <input id={prevActionId} className="swiper-button-prev size-0!" type='button' />
                    </>
                }

            </Swiper>
        </div>
    );
};

export default Slider;

////////////////////////////////////////////////////////////////////////////////////////////////////////
import "swiper/css"
import { cn } from '@/src/lib/utils';
import { SwiperOptions } from 'swiper/types';

function FSlider<T extends (Article | User)>({ data, slidesPerView, isCenteredSlides, isAutoRail, nextActionId, prevActionId }: Props<T>) {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div className='container mx-auto'>
            <Swiper
                modules={[Navigation, Mousewheel, Autoplay]}
                slidesPerView={slidesPerView}
                loop={true}
                spaceBetween={16}
                centeredSlides={isCenteredSlides}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                mousewheel={true}

                // conditions 



                // styles
                className='mySwiper flex items-stretch!'
            >
                {
                    (data[0] as Article).authors
                        ?
                        data.map((item) => (
                            <SwiperSlide className='h-auto! flex-col flex' key={item._id}>
                                <ArticleBox {...(item as Article)} className="flex-1 h-full w-full" />
                            </SwiperSlide>
                        ))
                        :
                        data.map((item) => (
                            <SwiperSlide className='h-auto! flex-col flex' key={item._id + (item as User).userName}>
                                <UserBox {...(item as User)} className="flex-1 h-full w-full" />
                            </SwiperSlide>
                        ))
                }
                <Activity mode={isAutoRail ? "hidden" : "visible"}>
                    <input id={nextActionId} className="swiper-button-next size-0!" type='button' />
                    <input id={prevActionId} className="swiper-button-prev size-0!" type='button' />
                </Activity>
            </Swiper>
        </div>
    );
};