import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface RollingNumberProps {
  from: number;
  to: number;
}

export function RollingNumber({ from, to }: RollingNumberProps) {
  const [currentValue, setCurrentValue] = useState(from);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateNumber = { value: from };

    gsap.to(updateNumber, {
      value: to,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        setCurrentValue(Math.round(updateNumber.value)); // Округляем для целых чисел
      },
    });
  }, [from, to]);

  return <span ref={numberRef}>{currentValue}</span>;
}
