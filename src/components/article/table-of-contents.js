import { renderToString } from "react-dom/server"
import { Link } from "gatsby"
import * as cheerio from "cheerio"

import { ArticleMarkdown } from "datsukan-blog-markdown"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCaretRight,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons"

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
  const body = article.body.body
  if (!body) return null

  const $ = cheerio.load(renderToString(<ArticleMarkdown text={body} />))
  const headings = $("h2, h3, h4").toArray()
  const toc = headings.map(data => ({
    text: $(data).contents().text(),
    id: $(data).attr("id"),
    name: data.name,
  }))
  const heightClassName = className.includes("sticky")
    ? "max-h-[calc(100vh-140px)]"
    : "max-h-96"

  return (
    <div className={className}>
      <span className="text-md font-bold">目次</span>
      <ul className={`mt-5 overflow-y-auto ${heightClassName}`}>
        {toc.map(item => (
          <li
            key={item.id}
            className={`
              mb-3
              flex
              text-secondary
              hover:text-primary
              ${styleMap[item.name]}
            `}
          >
            <FontAwesomeIcon
              icon={iconMap[item.name]}
              width={14}
              height={14}
              className="mr-2 mt-0.5 inline-block"
            />
            <Link to={`#${item.id}`}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
