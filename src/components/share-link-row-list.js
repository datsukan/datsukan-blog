import { GoodButton } from "@components/good-button"
import { ShareHatebuButton } from "@components/share-hatebu-button"
import { ShareTwitterButton } from "@components/share-twitter-button"
import { ShareFacebookButton } from "@components/share-facebook-button"

export const ShareLinkRowList = ({ className, articleID, url }) => {
  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
      <GoodButton articleID={articleID} className="mr-3" />
      <ShareHatebuButton url={url} />
      <ShareTwitterButton url={url} />
      <ShareFacebookButton url={url} />
    </div>
  )
}
