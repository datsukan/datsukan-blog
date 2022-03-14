import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"

export const AnchorLink = ({ className, id }) => {
  return (
    <div className={className}>
      <Link to={`#${id}`}>
        <FontAwesomeIcon
          icon={faLink}
          width={20}
          height={20}
          className="block text-secondary w-5 h-5"
        />
      </Link>
    </div>
  )
}
