// import { useReducer, useState } from "react";
//https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase
import { alphabets } from "../alphabets";

interface BoxProps {
  start: number;
  end: number;

  input: string[] | null;

  setInput: (value: string[]) => void;
  index: number;
  setIndex: (value: number) => void;
}

export function Keys({
  start,
  end,
  input,
  setInput,
  index,
  setIndex,
}: BoxProps) {
  function handleClick(c: string) {
    if (input && input[4] == "" && index < 5) {
      const newArry = [...input];
      newArry[index] = c;
      setIndex(index + 1);
      setInput(newArry);
    }
  }

  return (
    <div className="flex justify-center items-center gap-1.5 h-16 ">
      {alphabets.slice(start, end).map(function (alphabet, index) {
        return (
          <div
            key={index}
            className="text-white h-14 w-12 bg-slate-600 font-bold text-xl rounded-lg flex justify-center items-center cursor-pointer select-none"
            onClick={() => handleClick(alphabet)}
          >
            {alphabet}
          </div>
        );
      })}
    </div>
  );
}
