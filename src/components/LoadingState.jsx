import Skeleton from "./Skeleton"

function LoadingState() {
    return (
        <div className="w-full max-w-4xl mt-8">
            <div className="flex justify-center gap-4 max-sm:flex-col">
                <div className="flex flex-col gap-6">
                    <Skeleton className="w-full h-45" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <Skeleton className="h-22" />
                        <Skeleton className="h-22" />
                        <Skeleton className="h-22" />
                        <Skeleton className="h-22" />
                    </div>
                    <div className="flex gap-3.5 overflow-x-auto pb-2">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <Skeleton key={i} className="min-w-20 h-32" />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full sm:w-80">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-12" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LoadingState;