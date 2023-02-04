import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight } from "@fortawesome/free-solid-svg-icons"

export const SiteAboutLink = () => {
  return (
    <Link to="/about" itemProp="url">
      <div className="flex content-center gap-1 hover:underline">
        <FontAwesomeIcon
          icon={faCaretRight}
          width={14}
          height={14}
          className="mr-2 mt-0.5 inline-block"
        />

        <span className="text-sm">datsukan blogについて</span>
      </div>
    </Link>
  )
}
