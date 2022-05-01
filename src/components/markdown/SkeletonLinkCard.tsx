export type Props = {
  className?: string
}

export const SkeletonLinkCard = ({ className = "" }: Props) => {
  return (
    <span
      className={`h-32 flex animate-pulse overflow-hidden rounded-lg border border-gray-300 ${className}`}
    >
      <span className="flex flex-1 flex-col justify-between p-3">
        <span>
          <span className="block !m-0 h-12 rounded-md bg-gray-200"></span>
          <span className="block !mt-2 !mb-0 h-4 rounded-md bg-gray-200"></span>
        </span>
        <span className="flex items-center gap-2">
          <span className="h-5 w-5 rounded-full bg-gray-200"></span>
          <span className="h-4 w-24 rounded-md bg-gray-200"></span>
        </span>
      </span>
      <span className="aspect-square h-full bg-gray-200"></span>
    </span>
  )
}
