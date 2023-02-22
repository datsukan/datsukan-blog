import { Emoji } from "@components/Emoji"

type Props = {
  className?: string
  emoji: string
}

export const ArticleHero = ({ className = "", emoji }: Props) => {
  return (
    <div
      className={`flex h-60 items-center justify-center overflow-hidden rounded-lg border-2 border-tertiary ${className}`}
    >
      <Emoji text={emoji} size="medium" className="drop-shadow-xl" />
    </div>
  )
}
