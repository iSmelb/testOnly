import { NavigationOptions } from "swiper/types";

export const navigationConfig = (className: string): NavigationOptions => ({
  nextEl: ".nav_next_" + className,
  prevEl: ".nav_prev_" + className,
  disabledClass: "nav_disabled_" + className,
});
