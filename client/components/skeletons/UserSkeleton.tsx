import { Skeleton } from "../ui/skeleton";

export const UserSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_: any, idx: number) => (
        <Skeleton
          className="w-[300px] h-[400px] flex flex-col items-center justify-between p-6 rounded-lg shadow-lg bg-white/20"
          key={idx}
        >
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="size-24 rounded-full bg-neutral-400" />
            <div className="text-center space-y-1">
              <Skeleton className="w-[150px] h-4 rounded-full mx-auto bg-neutral-400" />
              <Skeleton className="w-[200px] h-4 rounded-full mx-auto bg-neutral-400" />
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-center">
              <Skeleton className="w-[25px] h-8 rounded-lg mx-auto bg-neutral-400" />
              <Skeleton className="w-[75px] mt-2 h-2 rounded-full mx-auto bg-neutral-400" />
            </div>
            <div className="flex flex-col items-center">
              <Skeleton className="w-[25px] h-8 rounded-lg mx-auto bg-neutral-400" />
              <Skeleton className="w-[75px] mt-2 h-2 rounded-full mx-auto bg-neutral-400" />
            </div>
          </div>
        </Skeleton>
      ))}
    </>
  );
};
