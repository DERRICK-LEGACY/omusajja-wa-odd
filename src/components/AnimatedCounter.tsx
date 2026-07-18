"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

export default function AnimatedCounter({ end, duration = 2000, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let startTime: number | null = null;
    let observer: IntersectionObserver;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(animate);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [end, duration]);

  return (
    <h3 ref={countRef}>
      {count}{suffix}
    </h3>
  );
}
