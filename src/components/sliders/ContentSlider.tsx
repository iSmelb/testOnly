import NavigationPanel from "@/components/NavigationPanel/NavigationPanel";
import { IhistoricalEvent } from "@/data/fakeData";
import { RefObject } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { navigationConfig } from "./config";

export interface IHistoryBlock {
  data: IhistoricalEvent[];
  ref?: RefObject<HTMLDivElement>;
}

export function ContentSlider({ data, ref }: IHistoryBlock) {
  return (
    <div ref={ref} className="content_slider">
      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={2}
        navigation={navigationConfig("content")}
        breakpoints={{
          1024: {
            spaceBetween: 80,
            slidesPerView: 3,
          },
        }}
      >
        <NavigationPanel className="content" />

        {data?.map((slide) => (
          <SwiperSlide key={slide.year}>
            <h3>{slide.year}</h3>
            <p>{slide.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
