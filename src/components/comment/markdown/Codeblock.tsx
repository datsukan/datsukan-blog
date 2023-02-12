import { ReactElement } from "react"
import ReactDOMServer from "react-dom/server"
import innerText from "react-innertext"

import { CodeblockTitle } from "@components/comment/markdown/CodeblockTitle"
import { CodeblockCopyButton } from "@components/comment/markdown/CodeblockCopyButton"

export type Props = {
  children: ReactElement[]
}

export const Codeblock = ({ children }: Props) => {
  if (!children || children.length === 0) return

  const className: string = children[0].props.className
  const title: string = children[0].props.title ?? ""
  let code: ReactElement = children[0].props.children

  const codeExists = () => {
    return ReactDOMServer.renderToString(code).length > 0
  }

  return (
    <div>
      {title && <CodeblockTitle title={title} className="inline-block" />}
      <div className="relative">
        {codeExists() && (
          <CodeblockCopyButton
            text={innerText(code)}
            className="absolute top-2 right-2"
          />
        )}
        <pre
          className={`
            !mt-0
            !overflow-x-auto
            ${title ? "!rounded-tl-none" : ""}
            ${className}
          `}
        >
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
