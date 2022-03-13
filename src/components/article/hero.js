import { Emoji } from "@components/emoji"

export const ArticleHero = ({ className = "", emoji }) => {
  return (
    <div
      className={`h-60 border-2 border-tertiary rounded-lg overflow-hidden flex items-center justify-center ${className}`}
    >
      <Emoji text={emoji} size="medium" className="drop-shadow-xl" />
    </div>
  )
}
