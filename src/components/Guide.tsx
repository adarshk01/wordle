interface guideProp {
  setGuide: () => void;
}

export function Guide({ setGuide }: guideProp) {
  return (
    <div className="">
      <div className="h-fit w-fit max-w-80 bg-zinc-900 border border-zinc-600 rounded-xl p-10 overflow-hidden relative">
        <div
          className={`absolute top-3 left-[83%] hover:bg-zinc-700 cursor-pointer p-2 rounded-full  `}
          onClick={setGuide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div className="text-2xl font-bold text-white flex justify-start">
          {" "}
          HOW TO PLAY?{" "}
        </div>
        <div className="text-lg font-semibold text-white flex justify-start">
          Guess the Wordle in 6 tries.
        </div>
        <div>
          <ul className="list-disc text-white text-base mt-2.5 text-wrap">
            <li className="text-wrap mb-2.5">
              Each guess must be a valid 5-letter word.
            </li>
            <li className="text-wrap">
              The color of the tiles will change to show how close your guess
              was to the word.
            </li>
          </ul>
        </div>

        <div className="  absolute top-[80%] -left-10">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[350px] w-[350px] sm:blur-[150px] blur-[96px]"
          >
            <path
              fill="#0F62FE"
              d="M18.2,-33.6C30.3,-24.4,51.7,-33.3,66.2,-30.7C80.7,-28.1,88.3,-14,88.4,0.1C88.6,14.2,81.2,28.4,71.3,38.9C61.3,49.5,48.9,56.3,36.6,60.2C24.3,64,12.2,64.8,2.3,60.9C-7.6,56.9,-15.1,48.1,-26.4,43.6C-37.6,39.2,-52.6,39.1,-58.9,32.5C-65.2,26,-63,13,-54.2,5.1C-45.4,-2.8,-30.1,-5.7,-28,-19.6C-25.9,-33.5,-37.1,-58.5,-34.6,-73.3C-32.1,-88.1,-16.1,-92.8,-6.5,-81.5C3,-70.1,6,-42.9,18.2,-33.6Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
