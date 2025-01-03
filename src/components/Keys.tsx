import { alphabets } from "../alphabets";

interface BoxProps {
  start: number;
  end: number;
}

export function Keys({ start, end }: BoxProps) {
  return (
    <div className="flex justify-center items-center gap-1.5 h-16 ">
      {alphabets.slice(start, end).map(function (alphabet, index) {
        return (
          <div
            key={index}
            className="text-white h-14 w-12 bg-slate-600 font-bold text-xl rounded-lg flex justify-center items-center cursor-pointer"
          >
            {alphabet}
          </div>
        );
      })}
    </div>
  );
}
