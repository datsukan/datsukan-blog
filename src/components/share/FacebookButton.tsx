import { FacebookShareButton, FacebookIcon } from "react-share"

type Props = {
  className?: string
  url: string
}

export const ShareFacebookButton = ({ className = "", url }: Props) => {
  if (!url) return null

  return (
    <div className={`group relative h-16 w-16 p-2 drop-shadow ${className}`}>
      <FacebookShareButton url={url}>
        <div className="absolute z-10 hidden h-12 w-12 rounded-full bg-sky-300 mix-blend-multiply group-hover:block" />
        <FacebookIcon size={48} round />
      </FacebookShareButton>
    </div>
  )
}
