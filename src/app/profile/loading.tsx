import Section from "~components/section";
import { tw } from "~lib/helpers";

export default function Loading() {
  return (
    <Section className="flex flex-col justify-between min-h-screen items-center">
      <div className="w-full">
        <div className="w-28 h-8 bg-zinc-300 dark:bg-zinc-800 rounded-md animate-pulse"></div>
        <div className="mt-7 flex flex-col">
          <div className="border-brutalism rounded-lg bg-zinc-200 dark:bg-zinc-800 px-3 py-2">
            <div className="flex justify-start items-center space-x-4">
              <div className="w-[75px] h-[75px] bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
              <div>
                <div className="h-8 w-64 rounded-md bg-zinc-300 dark:bg-zinc-700"></div>
                <div className="h-8 w-64 rounded-md bg-zinc-300 dark:bg-zinc-700 mt-3"></div>
              </div>
            </div>
          </div>
          <div className="border-brutalism mt-6 bg-zinc-200 dark:bg-zinc-800 rounded-lg px-3 py-2">
            <div className="flex justify-start items-center space-x-4">
              <div className="w-[75px] h-[75px] bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
              <div>
                <div className="h-8 w-64 rounded-md bg-zinc-300 dark:bg-zinc-700"></div>
                <div className="h-10 w-64 rounded-md bg-zinc-300 dark:bg-zinc-700 mt-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={tw(
          "bg-red-400 dark:bg-zinc-800 w-full h-[430px] rounded-lg",
          "px-6 space-y-4 py-8 border-2 border-zinc-900"
        )}
      >
        <div
          className={tw(
            "rounded-3xl flex justify-between items-center",
            "drop-shadow-md px-4 py-2 bg-zinc-50 dark:bg-zinc-800 dark:border-2 dark:border-zinc-50"
          )}
        >
          <div className="w-[41px] h-[41px] bg-zinc-300 dark:bg-zinc-700 animate-pulse rounded-full"></div>
          <div className="h-5 w-44 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse"></div>
        </div>
        <div
          className={tw(
            "rounded-3xl flex justify-between items-center",
            "drop-shadow-md px-4 py-2 bg-zinc-50 dark:bg-zinc-800 dark:border-2 dark:border-zinc-50"
          )}
        >
          <div className="w-[41px] h-[41px] bg-zinc-300 dark:bg-zinc-700 animate-pulse rounded-full"></div>
          <div className="h-5 w-44 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse"></div>
        </div>
        <div
          className={tw(
            "rounded-3xl flex justify-between items-center",
            "drop-shadow-md px-4 py-2 bg-zinc-50 dark:bg-zinc-800 dark:border-2 dark:border-zinc-50"
          )}
        >
          <div className="w-[41px] h-[41px] bg-zinc-300 dark:bg-zinc-700 animate-pulse rounded-full"></div>
          <div className="h-5 w-44 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse"></div>
        </div>
        <div
          className={tw(
            "rounded-3xl flex justify-between items-center",
            "drop-shadow-md px-4 py-2 bg-zinc-50 dark:bg-zinc-800 dark:border-2 dark:border-zinc-50"
          )}
        >
          <div className="w-[41px] h-[41px] bg-zinc-300 dark:bg-zinc-700 animate-pulse rounded-full"></div>
          <div className="h-5 w-44 rounded-md bg-zinc-300 dark:bg-zinc-700 animate-pulse"></div>
        </div>
      </div>
    </Section>
  );
}
