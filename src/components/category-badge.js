export const CategoryBadge = ({ children, className }) => {
  return (
    <div
      className={`px-1 py-0 bg-gray-800 rounded-md ring-1 ring-gray-300 inline-block ${className}`}
    >
      <span className="text-xs text-white font-bold">{children}</span>
    </div>
  )
}
