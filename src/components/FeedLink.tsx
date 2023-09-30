import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareRss } from "@fortawesome/free-solid-svg-icons"

type Props = {
  className?: string
}

export const FeedLink = ({ className = "" }: Props) => {
  return (
    <a
      href="/rss.xml"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-full p-3 hover:bg-primary-hover ${className}`}
    >
      <FontAwesomeIcon
        icon={faSquareRss}
        className="block h-6 w-6 text-orange-400"
      />
    </a>
  )
}
