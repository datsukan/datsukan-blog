import { Link } from "gatsby"
import * as cheerio from "cheerio"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight } from "@fortawesome/free-solid-svg-icons"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons"

const styleMap = {
  h2: "text-sm font-bold",
  h3: "text-sm ml-4",
  h4: "text-sm ml-8",
}

const iconMap = {
  h2: faCaretRight,
  h3: faAngleRight,
  h4: faAnglesRight,
}

export const TableOfContents = ({ className = "", article }) => {
  const body = article?.body
  if (!body) return null

  const $ = cheerio.load(body)
  const headings = $("h2, h3, h4").toArray()
  const toc = headings.map(data => ({
    text: data.children[0].data,
    id: data.attribs.id,
    name: data.name,
  }))

  return (
    <div className={className}>
      <span className="text-md font-bold">目次</span>
      <ul className="mt-5">
        {toc.map(item => (
          <li
            key={item.id}
            className={`mb-3 text-secondary hover:text-primary ${
              styleMap[item.name]
            }`}
          >
            <FontAwesomeIcon
              icon={iconMap[item.name]}
              width={14}
              height={14}
              className="mr-2 inline-block"
            />
            <Link to={`#${item.id}`}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
