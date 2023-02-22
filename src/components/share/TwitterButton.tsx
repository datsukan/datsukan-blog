import { TwitterShareButton, TwitterIcon } from "react-share"

type Props = {
  className?: string
  url: string
}

export const ShareTwitterButton = ({ className = "", url }: Props) => {
  if (!url) return null

  return (
    <div className={`group relative h-16 w-16 p-2 drop-shadow ${className}`}>
      <TwitterShareButton url={url}>
        <div className="absolute z-10 hidden h-12 w-12 rounded-full bg-sky-200 mix-blend-multiply group-hover:block" />
        <TwitterIcon size={48} round />
      </TwitterShareButton>
    </div>
  )
}
