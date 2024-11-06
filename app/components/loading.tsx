import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col p-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-col border-t py-4 first:border-t-0 first:pt-0 last:pb-0">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2 mt-2">
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
        </div>
      ))}
    </div>
  );
}
