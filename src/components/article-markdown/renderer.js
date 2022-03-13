import { useCallback } from "react"
import {
  DEFAULT_MARKDOWN_OPTIONS,
  DEFAULT_MARKDOWN_RENDERERS,
  useMarkdownConfig,
  Markdown,
} from "react-marked-renderer"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"

import {
  Title as CodeblockTitle,
  CopyButton as CodeblockCopyButton,
} from "@components/article-markdown/codeblock"

const options = {
  ...DEFAULT_MARKDOWN_OPTIONS,

  breaks: true,
  langPrefix: "",
}

const renderers = {
  ...DEFAULT_MARKDOWN_RENDERERS,

  codeblock: codeblockRenderer,
}

const highlightCode = (code, lang) => hljs.highlightAuto(code, [lang]).value

export const ArticleMarkdownRenderer = ({ markdown }) => {
  return (
    <Markdown
      markdown={markdown}
      options={options}
      renderers={renderers}
      highlightCode={highlightCode}
    />
  )
}

function codeblockRenderer({
  lang: alias,
  text: code,
  children: propChildren,
}) {
  const { langPrefix, highlightCode, highlightElement } = useMarkdownConfig()

  let key
  let children
  let dangerouslySetInnerHTML

  const delimiter = ":"
  const info = alias.split(delimiter)
  const lang = info.shift()
  const title = info.join(delimiter) // 2つ目以降のdelimiterはファイル名として扱う
  const codeClassName = lang ? `${langPrefix}${lang}` : undefined

  if (highlightCode) {
    dangerouslySetInnerHTML = {
      __html: highlightCode(code, lang),
    }
  } else {
    children = propChildren

    if (highlightElement) {
      key = `${code}${lang}`
    }
  }

  return (
    <div className="!mt-6">
      {title && <CodeblockTitle title={title} className="inline-block" />}
      <pre
        key={key}
        className={`
            !mt-0
            relative
            !overflow-visible
            ${title ? "!rounded-tl-none" : ""}
          `}
      >
        <CodeblockCopyButton text={code} className="absolute top-2 right-2" />
        <code
          ref={useCallback(
            instance => {
              if (!instance || !highlightElement) {
                return
              }

              highlightElement(instance)
            },
            [highlightElement]
          )}
          className={codeClassName}
          dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        >
          {children}
        </code>
      </pre>
    </div>
  )
}
