import NavigationPanel from "@/components/NavigationPanel/NavigationPanel";
import { BannerSlider } from "@/components/sliders/BannerSlider";
import { ContentSlider } from "@/components/sliders/ContentSlider";
import { baseAngleCalc, rotationStepCalc } from "@/components/utils/utils";
import { fakeData, IhistoricalEvent } from "@/data/fakeData";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import SlideCounter from "../SliderCounter/SlideCounter";
import "./HistoryBlock.scss";

export interface IHistoryBlock {
  data?: IhistoricalEvent[][];
}

export function HistoryBlock({ data = fakeData }: IHistoryBlock) {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLInputElement>(null!);
  const isLargeScreen = window.innerWidth >= 1024;

  useEffect(() => {
    //animations
    gsap.to(contentRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        gsap.to(contentRef.current, { opacity: 1, duration: 0.5 });
      },
    });

    if (isLargeScreen) {
      gsap.to(".pagination", {
        rotation: -rotationStepCalc(activeIndex, data.length),
        duration: 1,
        ease: "power2.inOut",
      });

      gsap.utils.toArray(".bullet_text").forEach((bullet, index) => {
        const baseAngle = -baseAngleCalc(index, data.length);
        const rotationShift = rotationStepCalc(activeIndex, data.length);

        gsap.to(bullet as gsap.TweenTarget, {
          "--angle-revert": `${baseAngle + rotationShift}deg`,
          duration: 1,
        });
      });
    } else {
      // Отключение анимации для маленьких экранов
      gsap.killTweensOf(".pagination");
      gsap.killTweensOf(".bullet_text");
    }
  }, [isLargeScreen, activeIndex, data]);

  return (
    <section className="history_section">
      <BannerSlider
        data={data}
        slideChange={setActiveIndex}
        activeIndex={activeIndex}
      />

      <SlideCounter current={activeIndex} max={data.length} />
      <NavigationPanel className="banner" />

      <ContentSlider ref={contentRef} data={data[activeIndex]} />
    </section>
  );
}

// const mm = gsap.matchMedia();

//     mm.add("(min-width: 1024px)", () => {
//       gsap.to(".pagination", {
//         rotation: -rotationStepCalc(activeIndex, data.length), // rotate dots
//         duration: 1,
//         ease: "power2.inOut",
//       });

//       return () => {
//         gsap.killTweensOf(".pagination"); // Очищаем анимацию при выходе из брейкпоинта
//       };
//     });

//     mm.add("(min-width: 1024px)", () => {
//       gsap.utils.toArray(".bullet_text").forEach((bullet, index) => {
//         const baseAngle = -baseAngleCalc(index, data.length);
//         const rotationShift = rotationStepCalc(activeIndex, data.length);

//         gsap.to(bullet as gsap.TweenTarget, {
//           "--angle-revert": `${baseAngle + rotationShift}deg`,
//           duration: 1,
//         });
//       });

//       return () => {
//         gsap.killTweensOf(".bullet_text");
//       };
//     });

//     return () => {
//       mm.revert(); // Убираем все слушатели при размонтировании
//     };
