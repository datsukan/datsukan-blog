import { Link } from "gatsby"

export const CategoryBadge = ({ children, className = "", slug }) => {
  const Badge = () => (
    <div
      className={`px-2 py-1 bg-gray-800 hover:bg-gray-600 rounded-full flex items-center justify-start ${className}`}
    >
      <span className="text-xs text-white">{children}</span>
    </div>
  )

  // slug が未指定の場合、リンク無し
  if (!slug) return <Badge />

  return (
    <Link to={`/category/${slug}`}>
      <Badge />
    </Link>
  )
}
