import { Link } from "gatsby"

export const TagBadge = ({ children, className, name }) => {
  const Badge = () => (
    <div
      className={`px-2 py-0 bg-gray-200 hover:bg-gray-300 rounded-full inline-block ${className}`}
    >
      <span className="text-xs text-secondary">{children}</span>
    </div>
  )

  // name が未指定の場合、リンク無し
  if (!name) return <Badge />

  return (
    <Link to={`/tag/${name}`}>
      <Badge />
    </Link>
  )
}
