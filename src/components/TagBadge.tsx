import type { ReactNode } from "react"
import { Link } from "gatsby"

type Props = {
  children: ReactNode
  className?: string
  slug: string
}

export const TagBadge = ({ children, className = "", slug }: Props) => {
  const Badge = () => (
    <div
      className={`flex items-center justify-start rounded-full bg-gray-200 px-2 py-1 hover:bg-gray-300 ${className}`}
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
