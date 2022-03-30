import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareRss } from "@fortawesome/free-solid-svg-icons"

export const FeedLink = ({ className = "" }) => {
  return (
    <a
      href="/feed"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-full p-3 hover:bg-primary-hover ${className}`}
    >
      <FontAwesomeIcon
        icon={faSquareRss}
        className="block text-orange-400 w-6 h-6"
      />
    </a>
  )
}
