import { Link } from "gatsby"
import { LinkIcon } from "@heroicons/react/solid"

export type Props = {
  id: string
  className: string
}

export const HeaderAnchorLink = ({ className = "", id }: Props) => {
  return (
    <div className={className}>
      <Link to={`#${id}`}>
        <LinkIcon className="block h-5 w-5 cursor-pointer text-secondary" />
      </Link>
    </div>
  )
}
