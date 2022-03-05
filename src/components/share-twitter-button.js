import { TwitterShareButton, TwitterIcon } from "react-share"

export const ShareTwitterButton = ({ className = "", url }) => {
  if (!url) return null

  return (
    <div className={`group h-16 w-16 p-2 drop-shadow relative ${className}`}>
      <TwitterShareButton url={url}>
        <div className="absolute z-10 hidden group-hover:block h-12 w-12 rounded-full mix-blend-multiply bg-sky-200" />
        <TwitterIcon size={48} round />
      </TwitterShareButton>
    </div>
  )
}
