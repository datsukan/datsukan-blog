import { Link } from "gatsby"

export const TagBadge = ({ children, className = "", slug }) => {
  const Badge = () => (
    <div
      className={`px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-start ${className}`}
    >
      <span className="text-xs text-secondary">{children}</span>
    </div>
  )

  // slug が未指定の場合、リンク無し
  if (!slug) return <Badge />

  return (
    <Link to={`/tag/${slug}`}>
      <Badge />
    </Link>
  )
}
