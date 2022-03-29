import { renderToString } from "react-dom/server"
import { Link } from "gatsby"
import * as cheerio from "cheerio"

import { ArticleMarkdownRenderer } from "@components/article-markdown/renderer"
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
  const body = article.body.body
  if (!body) return null

  const $ = cheerio.load(
    renderToString(<ArticleMarkdownRenderer markdown={body} />)
  )
  const headings = $("h2, h3, h4").toArray()
  const toc = headings.map(data => ({
    text: $(data).contents().text(),
    id: $(data).attr("id"),
    name: data.name,
  }))

  return (
    <div className={className}>
      <span className="text-md font-bold">目次</span>
      <ul className="mt-5">
        {toc.map(item => (
          <li
            key={item.id}
            className={`
              mb-3
              text-secondary
              hover:text-primary
              flex
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
