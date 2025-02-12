import { RollingNumber } from "@/components/RollingNumber/RollingNumber";
import { IhistoricalEvent } from "@/data/fakeData";
import { Dispatch, SetStateAction, useMemo } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import { PaginationOptions } from "swiper/types";
import { navigationConfig } from "./config";

export interface IHistoryBlock {
  data: IhistoricalEvent[][];
  slideChange: Dispatch<SetStateAction<number>>;
  activeIndex: number;
}

export function BannerSlider({
  data,
  slideChange,
  activeIndex,
}: IHistoryBlock) {
  const paginationConfig: PaginationOptions = useMemo(
    () => ({
      clickable: true,
      el: ".pagination",
      bulletClass: "pagination_bullet",
      bulletActiveClass: "pagination_bullet_active",
      renderBullet: (index: number, className: string) => {
        return `<button style="--angle: ${
          (360 / data.length) * index
        }deg" class=${className}>
        <span class="bullet_text">${index + 1}</span></button>`;
      },
    }),
    [data]
  );

  return (
    <div className="banner_slider">
      <h1>Исторические даты</h1>
      <div className="pagination" />
      <Swiper
        speed={0}
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        pagination={paginationConfig}
        navigation={navigationConfig("banner")}
        onSlideChange={(swiper) => slideChange(swiper.activeIndex)}
      >
        {data.map((arr, i) => {
          const firstYear = arr[0]?.year;
          const lastYear = arr[arr.length - 1]?.year;

          const previosFirst = data[activeIndex - 1]?.[0]?.year || firstYear;
          const previosLast =
            data[activeIndex - 1]?.[arr.length - 1]?.year || lastYear;

          return (
            <SwiperSlide key={i}>
              <h2>
                <RollingNumber from={previosFirst} to={firstYear} />{" "}
                <RollingNumber from={previosLast} to={lastYear} />
              </h2>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
