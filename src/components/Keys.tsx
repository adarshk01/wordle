import { alphabets } from "../alphabets";

interface BoxProps {
  start: number;
  end: number;
  done: boolean;
  input: string[] | null;
  guessWord: string[];
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
  guessWord,
  done,
}: BoxProps) {
  function handleClick(c: string) {
    if (input && index < 5 && !done) {
      const newArry = [...input];
      newArry[index] = c;

      setIndex((prevIndex: number) => {
        return prevIndex + 1;
      });

      setInput(newArry);
    }
  }

  function getKeyColor(alphabet: string): string {
    if (!typedList) return "bg-slate-600";

    const guessWordStr = guessWord.join("");
    const typedWords = typedList.join("").match(/.{1,5}/g) || [];

    for (let i = typedWords.length - 1; i >= 0; i--) {
      const word = typedWords[i];
      const index = word.indexOf(alphabet);

      if (index !== -1) {
        if (guessWordStr[index] === alphabet) {
          return "bg-green-600";
        }
        if (guessWordStr.includes(alphabet)) {
          return "bg-yellow-500";
        }
        return "bg-gray-800";
      }
    }

    return "bg-slate-600";
  }

  return (
    <div className="flex justify-center items-center gap-1.5 h-16 ">
      {alphabets.slice(start, end).map(function (alphabet, index) {
        // const isTyped = typedList?.includes(alphabet);
        // let perfect;
        // const isCorrect = isTyped && guessWord.includes(alphabet);
        // const typedSlice = typedList?.slice(-5);

        // perfect =
        //   typedSlice?.[index] === alphabet && guessWord[index] === alphabet;
        // const isOutOfPosition = isCorrect && !perfect;
        const keyColor = getKeyColor(alphabet);
        return (
          <div
            key={index}
            className={`text-white h-14 w-12   font-bold text-xl rounded-lg flex justify-center items-center cursor-pointer select-none touch-manipulation transition-all duration-500 ease-out
               ${
                 //  perfect
                 //    ? "bg-green-600"
                 //    : isOutOfPosition
                 //    ? "bg-yellow-500"
                 //    : isTyped
                 //    ? "bg-gray-800"
                 //    : "bg-slate-600"
                 keyColor
               }  `}
            onClick={() => handleClick(alphabet)}
          >
            {alphabet}
          </div>
        );
      })}
    </div>
  );
}
