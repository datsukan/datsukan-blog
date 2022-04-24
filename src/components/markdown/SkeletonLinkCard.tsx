export type Props = {
  className?: string
}

export const SkeletonLinkCard = ({ className = "" }: Props) => {
  return (
    <div
      className={`h-32 flex animate-pulse overflow-hidden rounded-lg border border-gray-300 ${className}`}
    >
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <div className="!m-0 h-12 rounded-md bg-gray-200"></div>
          <div className="!mt-2 !mb-0 h-4 rounded-md bg-gray-200"></div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded-full bg-gray-200"></span>
          <span className="h-4 w-24 rounded-md bg-gray-200"></span>
        </div>
      </div>
      <div className="aspect-square h-full bg-gray-200"></div>
    </div>
  )
}
