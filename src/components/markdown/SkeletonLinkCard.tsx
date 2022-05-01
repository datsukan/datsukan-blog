export type Props = {
  className?: string
}

export const SkeletonLinkCard = ({ className = "" }: Props) => {
  return (
    <span
      className={`flex h-32 animate-pulse overflow-hidden rounded-lg border border-gray-300 bg-primary ${className}`}
    >
      <span className="flex flex-1 flex-col justify-between p-3">
        <span>
          <span className="!m-0 block h-12 rounded-md bg-gray-200"></span>
          <span className="!mt-2 !mb-0 block h-4 rounded-md bg-gray-200"></span>
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
