import { GoodButton } from "@components/good-button"
import { ShareHatebuButton } from "@components/share/HatebuButton"
import { ShareTwitterButton } from "@components/share/TwitterButton"
import { ShareFacebookButton } from "@components/share/FacebookButton"
import { UrlCopyButton } from "@components/share/UrlCopyButton"

type Props = {
  className?: string
  articleID: string
  url: string
}

export const ShareLinkRowList = ({ className = "", articleID, url }: Props) => {
  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      <GoodButton articleID={articleID} className="mr-3" />
      <ShareHatebuButton url={url} />
      <ShareTwitterButton url={url} />
      <ShareFacebookButton url={url} />
      <UrlCopyButton url={url} />
    </div>
  )
}
