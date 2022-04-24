import { renderToString } from "react-dom/server"
import { Link } from "gatsby"
import * as cheerio from "cheerio"

import { Markdown } from "@components/markdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCaretRight,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons"
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons"

type StyleMap = {
  h2: string
  h3: string
  h4: string
  [key: string]: string
}

type IconMap = {
  h2: IconDefinition
  h3: IconDefinition
  h4: IconDefinition
  [key: string]: IconDefinition
}

type TOC = {
  text: string
  id: string | undefined
  name: string
}[]

const styleMap: StyleMap = {
  h2: "text-sm font-bold",
  h3: "text-sm ml-4",
  h4: "text-sm ml-8",
}

const iconMap: IconMap = {
  h2: faCaretRight,
  h3: faAngleRight,
  h4: faAnglesRight,
}

export type Props = {
  className?: string
  markdown: string
}

export const TOC = ({ className = "", markdown }: Props) => {
  let toc: TOC = []

  if (markdown) {
    const $ = cheerio.load(renderToString(<Markdown text={markdown} />))
    const headings = $("h2, h3, h4").toArray()
    toc = headings.map(data => ({
      text: $(data).contents().text(),
      id: $(data).attr("id"),
      name: data.name,
    }))
  }

  return (
    <div
      className={`flex flex-col rounded-lg bg-white p-4 shadow-md ${className}`}
    >
      <p className="text-md font-bold">目次</p>
      <hr className="mt-2 mb-4" />
      <ul className="min-h-0 flex-1 overflow-y-auto">
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
