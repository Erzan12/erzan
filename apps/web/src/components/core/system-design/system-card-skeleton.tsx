import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function SystemCardSkeleton() {
    return (
        <Card className="h-[480px] flex flex-col bg-card border-border rounded-2x1 overflow-hidden shadow-none">
            <CardHeader>
                {/* Icon Circle Skeleton */}
                <Skeleton className="w-12 h-12 rounded-full mb-4" />
                {/* Title Skeleton */}
                <Skeleton className="h-7 w-3/4 rounded-lg" />
                {/* GitHub Stats Skeleton */}
                <div className="flex gap-3 mt-2">
                    <Skeleton className="h-3 w-12"/>
                    <Skeleton className="h-3 w-10"/>
                </div>
            </CardHeader>

            <CardContent className="p-6 flex-1 flex flex-col">
                {/* Description Lines */}
                <div className="space-y-2 mb-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w [95%]" />
                </div>

                {/* Badges Skeleton */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 flex flex-col gap-3">
                {/* Date Skeleton */}
                <div className="space-y-1 mb-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-2 w-32" />
                </div>
                {/* Buttons Skeleton */}
                <div className="flex gap-3 w-full">
                    <Skeleton className="h-9 flex-1 rounded-full" />
                    <Skeleton className="h-9 flex-1 rounded-full" />
                </div>
            </CardFooter>
        </Card>
    );
}