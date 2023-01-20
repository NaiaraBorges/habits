import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from '@radix-ui/react-checkbox';
import { ProgressBar } from "./ProgressBar";
import clsx from 'clsx';
import { Check } from "phosphor-react";

interface HabitDayProps {
  completed: number;
  amount: number;
}

export function HabitDay( {completed, amount} : HabitDayProps) {

  const completedPercentage = Math.round((completed / amount) * 100)

  return (
    <Popover.Root>
      <Popover.Trigger className={clsx('w-10 h-10 rounded-lg', {
        'bg-zinc-900 border-2 border-zinc-800': completedPercentage === 0,
        'bg-pink-900 border-pink-700': completedPercentage > 0 && completedPercentage < 20,
        'bg-pink-800 border-pink-600': completedPercentage >= 20 && completedPercentage < 40,
        'bg-pink-700 border-pink-600': completedPercentage >= 40 && completedPercentage < 60,
        'bg-pink-600 border-pink-500': completedPercentage >= 60 && completedPercentage < 80,
        'bg-pink-500 border-pink-400': completedPercentage >= 80,
      })}></Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">Segunda-feira</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            20/01
          </span>

          <ProgressBar progress={completedPercentage} />

          <div className="mt-6 flex flex-col gap-3">
            <Checkbox.Root
              className="flex items-center gap-3 group"
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Beber 2L de água
              </span>
            </Checkbox.Root>
          </div>

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
