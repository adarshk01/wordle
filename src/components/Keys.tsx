import { alphabets } from "../alphabets";

interface BoxProps {
  start: number;
  end: number;

  input: string[] | null;

  setInput: (value: string[]) => void;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  typedList: string[] | null;
}

export function Keys({
  start,
  end,
  input,
  setInput,
  index,
  setIndex,
  typedList,
}: BoxProps) {
  function handleClick(c: string) {
    if (input && index < 5) {
      const newArry = [...input];
      newArry[index] = c;

      setIndex((prevIndex: number) => {
        return prevIndex + 1;
      });

      setInput(newArry);
    }
  }

  return (
    <div className="flex justify-center items-center gap-1.5 h-16 ">
      {alphabets.slice(start, end).map(function (alphabet, index) {
        const isTyped = typedList?.includes(alphabet);

        return (
          <div
            key={index}
            className={`text-white h-14 w-12   font-bold text-xl rounded-lg flex justify-center items-center cursor-pointer select-none touch-manipulation transition-all duration-700 ease-in
               ${isTyped ? "bg-slate-700" : "bg-slate-600"} `}
            onClick={() => handleClick(alphabet)}
          >
            {alphabet}
          </div>
        );
      })}
    </div>
  );
}
