import { Link } from "gatsby"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
  slug: string
}

export const CategoryBadge = ({ children, className = "", slug }: Props) => {
  const Badge = () => (
    <div
      className={`flex items-center justify-start rounded-full bg-gray-800 px-2 py-1 hover:bg-gray-600 ${className}`}
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
