import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Box } from "./components/Box";
import confetti from "canvas-confetti";
import { Keys } from "./components/Keys";
import axios from "axios";

interface InputProps {
  [key: string]: string[];
}

function App() {
  const n: number = 6;
  const m: number = 5;
  const generateInitialInputs = (n: number, m: number): InputProps => {
    const initialInputs: InputProps = {};
    for (let i = 1; i <= n; i++) {
      initialInputs[i] = Array(m).fill("");
    }
    return initialInputs;
  };
  const [isConfettiRunning, setIsConfettiRunning] = useState(false);
  const [showWord, setShowWord] = useState(false);
  const [isActive, setIsActive] = useState<boolean[]>(Array(5).fill(false));
  const [index, setIndex] = useState<number>(0);
  const [done, setDone] = useState(false);
  const [winnerBanner, setWinnerBanner] = useState(false);
  const [typedList, setTypedList] = useState<string[]>([]);
  const [guessWord, setGuessWord] = useState<string[]>([]);
  const [count, setCount] = useState<number>(1);
  const [input, setInput] = useState<string[] | null>(Array(5).fill(""));
  const [allInputs, setAllInputs] = useState<InputProps>(
    generateInitialInputs(n, m)
  );
  const [checker, setChecker] = useState(false);
  const prevIndexRef = useRef<number>(index);
  const [status, setStatus] = useState(false);

  async function handleClick() {
    if (input && input[4] != "") {
      try {
        await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${input.join("")}`
        );
        // console.log(repo);
        const temp = isActive;
        temp[count - 1] = true;
        setIsActive(temp);
        setAllInputs((prev) => {
          return {
            ...prev,
            [count]: input,
          };
        });
        setTypedList((prev) => [...prev, ...input]);

        setCount(count + 1);
        setIndex(0);
        setInput(Array(5).fill(""));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 404) {
            setStatus(true);
            setTimeout(() => {
              setStatus(false);
            }, 1500);
          }
        }
      }
    }
  }

  useEffect(() => {
    async function fetchName() {
      const name = await axios.get(
        "https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase"
      );

      setGuessWord(name.data[0].split(""));
    }
    fetchName();
  }, []);

  useEffect(() => {
    const prev = prevIndexRef.current;
    const temp = prev;
    if (index >= temp) {
      setChecker(true);
      const timer = setTimeout(() => setChecker(false), 100);
      return () => clearTimeout(timer);
    }
    prevIndexRef.current = index;
  }, [index]);

  useEffect(() => {
    if (
      count > 1 &&
      JSON.stringify(guessWord) === JSON.stringify(typedList.slice(-5))
    ) {
      const timer = setTimeout(() => {
        setDone(true);
        setIsConfettiRunning(true);
        setWinnerBanner(true);
      }, 2000);
      const resetTimer = setTimeout(() => {
        setWinnerBanner(false);
        setIsConfettiRunning(false);
      }, 5000);
      return () => {
        clearTimeout(timer);
        clearTimeout(resetTimer);
      };
    }
  }, [count]);

  useEffect(() => {
    if (typedList.length == 30) {
      setShowWord(true);
      const timer = setTimeout(() => {
        setShowWord(true);
      }, 3000);
      const resetTimer = setTimeout(() => {
        setShowWord(false);
      }, 6000);
      return () => {
        clearTimeout(timer);
        clearTimeout(resetTimer);
      };
    }
  }, [typedList]);

  useEffect(() => {
    if (!isConfettiRunning) return;

    const end = Date.now() + 5 * 1000; // Run for 5 seconds
    const colors = ["#0EA5E9", "#ffffff"]; // Buckeyes colors

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        setIsConfettiRunning(false); // Stop confetti after 5 seconds
      }
    };

    // Start confetti animation
    requestAnimationFrame(frame);

    // Cleanup function if the component unmounts
    return () => setIsConfettiRunning(false);
  }, [isConfettiRunning]);

  return (
    <div className="h-screen min-h-fit min-w-fit bg-neutral-900 relative flex flex-col  ">
      <div className="fixed  sm:top-[65%] sm:left-80 top-[70%] -left-44 rotate-[160deg]  ">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[900px] w-[900px] sm:blur-[350px] blur-[96px]"
        >
          <path
            fill="#0F62FE"
            d="M18.2,-33.6C30.3,-24.4,51.7,-33.3,66.2,-30.7C80.7,-28.1,88.3,-14,88.4,0.1C88.6,14.2,81.2,28.4,71.3,38.9C61.3,49.5,48.9,56.3,36.6,60.2C24.3,64,12.2,64.8,2.3,60.9C-7.6,56.9,-15.1,48.1,-26.4,43.6C-37.6,39.2,-52.6,39.1,-58.9,32.5C-65.2,26,-63,13,-54.2,5.1C-45.4,-2.8,-30.1,-5.7,-28,-19.6C-25.9,-33.5,-37.1,-58.5,-34.6,-73.3C-32.1,-88.1,-16.1,-92.8,-6.5,-81.5C3,-70.1,6,-42.9,18.2,-33.6Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      {/* <div className="text-white flex justify-center">{guessWord.join("")}</div> */}
      <div className="flex justify-center items-start  pt-16">
        {/* <div className="grid gap-1.5">
          {Array.from({ length: 6 }).map(function (_, outIndex) {
            return (
              <div key={outIndex} className="grid grid-cols-5 gap-1.5">
                {Array.from({ length: 5 }).map(function (_, index) {
                  return <Box key={index} value={value} />;
                })}
              </div>
            );
          })}
        </div>{" "} */}
        <div
          className={`absolute h-fit w-fit p-2 bg-white rounded-lg transition-all  duration-200 text-black z-50 ${
            status
              ? "opacity-100 ease-in"
              : "opacity-0 pointer-events-none ease-out"
          }`}
        >
          Invalid word
        </div>
        <div
          className={`absolute h-fit w-fit p-5 font-bold text-xl bg-white rounded-lg transition-all  duration-200 text-black z-70 ${
            winnerBanner
              ? "opacity-100 ease-in"
              : "opacity-0 pointer-events-none ease-out"
          }`}
        >
          !!! 7 crore !!!
        </div>
        <div
          className={`absolute h-fit w-fit p-2 bg-white rounded-lg transition-all  duration-200 text-black z-70 ${
            showWord
              ? "opacity-100 ease-in"
              : "opacity-0 pointer-events-none ease-out"
          }`}
        >
          {`The word was ${guessWord.join("")}`}
        </div>
        <div>
          <div className="flex gap-[5px]  mb-[5px] ">
            {count == 1
              ? input?.map(function (i, idx) {
                  return (
                    <div
                      key={idx}
                      className={`${
                        checker && idx == index - 1 ? "animate-heartBeat" : ""
                      }
                      ${status ? "animate-headShake" : ""}`}
                    >
                      <Box
                        key={idx}
                        value={i}
                        delay={0}
                        submitted={false}
                        isPresent={false}
                        correct={false}
                      />
                    </div>
                  );
                })
              : allInputs["1"].map(function (i, idx) {
                  let correct = guessWord[idx] == i;

                  let isThere = guessWord.includes(i);

                  return (
                    <Box
                      key={idx}
                      value={i}
                      delay={idx + 1}
                      submitted={isActive[0]}
                      isPresent={isThere}
                      correct={correct}
                    />
                  );
                })}
          </div>

          <div className="flex gap-[5px]  mb-[5px] ">
            {count == 2
              ? input?.map(function (i, idx) {
                  return (
                    <div
                      key={idx}
                      className={`${
                        checker && idx == index - 1 ? "animate-heartBeat" : ""
                      } ${status ? "animate-headShake" : ""}`}
                    >
                      <Box
                        key={idx}
                        value={i}
                        delay={0}
                        submitted={false}
                        isPresent={false}
                        correct={false}
                      />
                    </div>
                  );
                })
              : allInputs["2"].map(function (i, idx) {
                  let correct = guessWord[idx] == i;
                  const isThere = guessWord.includes(i);
                  return (
                    <Box
                      key={idx}
                      value={i}
                      delay={idx + 1}
                      submitted={isActive[1]}
                      isPresent={isThere}
                      correct={correct}
                    />
                  );
                })}
          </div>

          <div className="flex gap-[5px]  mb-[5px]">
            {count == 3
              ? input?.map(function (i, idx) {
                  return (
                    <div
                      key={idx}
                      className={`${
                        checker && idx == index - 1 ? "animate-heartBeat" : ""
                      } ${status ? "animate-headShake" : ""}`}
                    >
                      <Box
                        key={idx}
                        value={i}
                        delay={0}
                        submitted={false}
                        isPresent={false}
                        correct={false}
                      />
                    </div>
                  );
                })
              : allInputs["3"].map(function (i, idx) {
                  let correct = guessWord[idx] == i;
                  const isThere = guessWord.includes(i);
                  return (
                    <Box
                      key={idx}
                      value={i}
                      delay={idx + 1}
                      submitted={isActive[2]}
                      isPresent={isThere}
                      correct={correct}
                    />
                  );
                })}
          </div>
          <div className="flex gap-[5px]  mb-[5px]">
            {count == 4
              ? input?.map(function (i, idx) {
                  return (
                    <div
                      key={idx}
                      className={`${
                        checker && idx == index - 1 ? "animate-heartBeat" : ""
                      } ${status ? "animate-headShake" : ""}`}
                    >
                      <Box
                        key={idx}
                        value={i}
                        delay={0}
                        submitted={false}
                        isPresent={false}
                        correct={false}
                      />
                    </div>
                  );
                })
              : allInputs["4"].map(function (i, idx) {
                  let correct = guessWord[idx] == i;
                  const isThere = guessWord.includes(i);
                  return (
                    <Box
                      key={idx}
                      value={i}
                      delay={idx + 1}
                      submitted={isActive[3]}
                      isPresent={isThere}
                      correct={correct}
                    />
                  );
                })}
          </div>
          <div className="flex gap-[5px]  mb-[5px]">
            {count == 5
              ? input?.map(function (i, idx) {
                  return (
                    <div
                      key={idx}
                      className={`${
                        checker && idx == index - 1 ? "animate-heartBeat" : ""
                      } ${status ? "animate-headShake" : ""}`}
                    >
                      <Box
                        key={idx}
                        value={i}
                        delay={0}
                        submitted={false}
                        isPresent={false}
                        correct={false}
                      />
                    </div>
                  );
                })
              : allInputs["5"].map(function (i, idx) {
                  let correct = guessWord[idx] == i;
                  const isThere = guessWord.includes(i);
                  return (
                    <Box
                      key={idx}
                      value={i}
                      delay={idx + 1}
                      submitted={isActive[4]}
                      isPresent={isThere}
                      correct={correct}
                    />
                  );
                })}
          </div>
          <div className="flex gap-[5px]  mb-[5px]">
            {count == 6
              ? input?.map(function (i, idx) {
                  return (
                    <div
                      key={idx}
                      className={`${
                        checker && idx == index - 1 ? "animate-heartBeat" : ""
                      } ${status ? "animate-headShake" : ""}`}
                    >
                      <Box
                        key={idx}
                        value={i}
                        delay={0}
                        submitted={false}
                        isPresent={false}
                        correct={false}
                      />
                    </div>
                  );
                })
              : allInputs["6"].map(function (i, idx) {
                  let correct = guessWord[idx] == i;
                  const isThere = guessWord.includes(i);
                  return (
                    <Box
                      key={idx}
                      value={i}
                      delay={idx + 1}
                      submitted={isActive[5]}
                      isPresent={isThere}
                      correct={correct}
                    />
                  );
                })}
          </div>
        </div>{" "}
      </div>
      <div className="z-20 mt-5  ">
        <div className="sm:mb-0 mb-2">
          <Keys
            start={0}
            end={10}
            input={input}
            setInput={setInput}
            index={index}
            setIndex={setIndex}
            typedList={typedList}
            guessWord={guessWord}
            done={done}
          />
        </div>
        <div className="sm:mb-0 mb-1">
          <Keys
            start={10}
            end={19}
            input={input}
            setInput={setInput}
            index={index}
            setIndex={setIndex}
            typedList={typedList}
            guessWord={guessWord}
            done={done}
          />
        </div>
        <div className="flex justify-center items-center sm:gap-1.5 h-16 gap-[1px]">
          <div
            className="text-white h-14 w-fit bg-slate-700 font-bold px-2.5 sm:px-5 rounded-lg flex justify-center items-center cursor-pointer"
            onClick={() => {
              if (input && index > 0 && index < 6) {
                const newInput = input;

                newInput[index - 1] = "";
                setIndex(index - 1);
                setInput(newInput);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
              />
            </svg>
          </div>
          <Keys
            start={19}
            end={26}
            input={input}
            setInput={setInput}
            index={index}
            setIndex={setIndex}
            typedList={typedList}
            guessWord={guessWord}
            done={done}
          />

          <div
            className="text-white h-14 w-fit bg-slate-700 font-bold px-2 sm:px-5 rounded-lg flex justify-center items-center cursor-pointer select-none"
            onClick={() => handleClick()}
          >
            Enter
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
