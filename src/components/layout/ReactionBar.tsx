import { GoodButton } from "@components/good-button"
import { ShareHatebuButton } from "@components/share/HatebuButton"
import { ShareTwitterButton } from "@components/share/TwitterButton"
import { ShareFacebookButton } from "@components/share/FacebookButton"
import { UrlCopyButton } from "@components/share/UrlCopyButton"

type Props = {
  className?: string
  url: string
  articleID: string
}

export const ReactionBar = ({ className = "", url, articleID }: Props) => {
  return (
    <div className={`grid grid-cols-1 gap-4 ${className}`}>
      <GoodButton articleID={articleID} />
      <ShareHatebuButton url={url} />
      <ShareTwitterButton url={url} />
      <ShareFacebookButton url={url} />
      <UrlCopyButton url={url} />
    </div>
  )
}
