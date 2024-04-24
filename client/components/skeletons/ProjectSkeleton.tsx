import { Skeleton } from "../ui/skeleton";

export const ProjectSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_: any, idx: number) => (
        <div
          className="max-w-[450px]  bg-white h-fit rounded-lg shadow-sm dark:bg-gray-950"
          key={idx}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-[100px] bg-neutral-300" />
              <Skeleton className="h-6 w-[70px] bg-neutral-300" />
            </div>
            <Skeleton className="h-3 xl:w-[280px] w-[200px] bg-neutral-300 mt-5" />
          </div>
          <div className="border-t dark:border-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="size-7 rounded-full bg-neutral-300" />
              <Skeleton className="size-7 rounded-full bg-neutral-300" />
            </div>
            <Skeleton className="h-6 w-[70px] bg-neutral-300" />
          </div>
        </div>
      ))}
    </>
  );
};
