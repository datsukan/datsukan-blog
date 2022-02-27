import { Link } from "gatsby"

export const CategoryBadge = ({ children, className, name }) => {
  const Badge = () => (
    <div
      className={`px-1 py-0 bg-gray-800 hover:bg-gray-600 rounded-md ring-1 ring-gray-300 inline-block ${className}`}
    >
      <span className="text-xs text-white">{children}</span>
    </div>
  )

  // name が未指定の場合、リンク無し
  if (!name) return <Badge />

  return (
    <Link to={`/category/${name}`}>
      <Badge />
    </Link>
  )
}
