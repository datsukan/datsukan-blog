import { GoodButton } from "@components/good-button"
import { ShareHatebuButton } from "@components/share/hatebu-button"
import { ShareTwitterButton } from "@components/share/twitter-button"
import { ShareFacebookButton } from "@components/share/facebook-button"
import { UrlCopyButton } from "@components/share/url-copy-button"

export const ReactionBar = ({ className = "", url, articleID }) => {
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
