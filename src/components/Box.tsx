import { useEffect, useState } from "react";

interface BoxProps {
  value: string | null;
  correct: boolean;
  delay: number | null;
  submitted: boolean;
  isPresent: boolean;
}

export function Box({ value, delay, submitted, isPresent, correct }: BoxProps) {
  const [flipped, setFlipped] = useState(false);
  // const [count, setCount] = useState(0);
  useEffect(() => {
    if (submitted && delay) {
      const timer = setTimeout(() => {
        setFlipped(true);
      }, delay * 300);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [submitted, delay]);

  return (
    <div>
      <div
        className={`h-[52px] w-[52px] border-2 z-30 text-white text-[27px] font-bold flex justify-center items-center select-none  transition-all ease-out duration-700
           ${
             //  flipped ? "bg-zinc-700 animate-vflip" : "bg-transparent"
             flipped
               ? correct
                 ? "animate-vflip bg-green-600 border-green-600"
                 : isPresent
                 ? "animate-vflip bg-yellow-500 border-yellow-500"
                 : "animate-vflip bg-zinc-700  border-zinc-700"
               : "bg-transparent border-zinc-700"
           }
           `}
      >
        {value}
      </div>
    </div>
  );
}

// ${flipped ? "animate-vflip bg-zinc-700" : "bg-transparent"}
