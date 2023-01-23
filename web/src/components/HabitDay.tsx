import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";
import clsx from 'clsx';
import dayjs from "dayjs";
import { HabitsList } from "./HabitsList";
import { useState } from "react";

interface HabitDayProps {
  date: Date;
  defaultCompleted?: number;
  amount?: number;
}

export function HabitDay( {defaultCompleted = 0, amount = 0, date} : HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted)

  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMounth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  function handleCompletedChanged(completed: number) {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger className={clsx('w-10 h-10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 focus:ring-offset-background', {
        'bg-zinc-900 border-2 border-zinc-800': completedPercentage === 0,
        'bg-pink-900 border-pink-700': completedPercentage > 0 && completedPercentage < 20,
        'bg-pink-800 border-pink-600': completedPercentage >= 20 && completedPercentage < 40,
        'bg-pink-700 border-pink-600': completedPercentage >= 40 && completedPercentage < 60,
        'bg-pink-600 border-pink-500': completedPercentage >= 60 && completedPercentage < 80,
        'bg-pink-500 border-pink-400': completedPercentage >= 80,
      })}></Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
        <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMounth}</span>

          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} onCompletedChanged={handleCompletedChanged} />


          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
