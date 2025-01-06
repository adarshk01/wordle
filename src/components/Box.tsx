import { useEffect, useState } from "react";

interface BoxProps {
  value: string | null;

  delay: number | null;
  submitted: boolean;
}

export function Box({ value, delay, submitted }: BoxProps) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (submitted && delay) {
      const timer = setTimeout(() => {
        setFlipped(true);
      }, delay * 300);
      return () => clearTimeout(timer);
    }
  }, [submitted, delay]);
  return (
    <div>
      <div
        className={`h-[52px] w-[52px] border-zinc-700 border-2 text-white text-[27px] font-bold flex justify-center items-center select-none  transition-all ease-out duration-700
           ${flipped ? "animate-vflip bg-zinc-700" : "bg-transparent"}`}
      >
        {value}
      </div>
    </div>
  );
}
