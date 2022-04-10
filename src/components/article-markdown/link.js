export const SkeletonLinkCard = ({ className = "" }) => {
  return (
    <div
      className={`rounded-lg border border-gray-300 flex overflow-hidden animate-pulse ${className}`}
    >
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div>
          <div className="!m-0 h-12 rounded-md bg-gray-200"></div>
          <div className="!mt-2 !mb-0 h-4 rounded-md bg-gray-200"></div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-gray-200"></span>
          <span className="h-4 w-24 rounded-md bg-gray-200"></span>
        </div>
      </div>
      <div className="h-full aspect-square bg-gray-200"></div>
    </div>
  )
}
