interface BoxProps {
  value: string | null;
}

export function Box({ value }: BoxProps) {
  return (
    <div>
      <div className="h-[52px] w-[52px] border-zinc-700 border-2 text-white text-[27px] font-bold flex justify-center items-center">
        {value}
      </div>
    </div>
  );
}
