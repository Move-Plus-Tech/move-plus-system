"use client";

import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  from: number;
  to: number;
  duration?: number;
}

export default function AnimatedNumber({
  from,
  to,
  duration = 1000,
}: AnimatedNumberProps) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const currentValue = Math.floor(
        from + (to - from) * percentage
      );

      setValue(currentValue);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [from, to, duration]);

  return <>{value}</>;
}
