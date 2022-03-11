import { useCallback } from "react"
import {
  DEFAULT_MARKDOWN_OPTIONS,
  DEFAULT_MARKDOWN_RENDERERS,
  useMarkdownConfig,
  Markdown,
} from "react-marked-renderer"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"

const options = {
  ...DEFAULT_MARKDOWN_OPTIONS,

  breaks: true,
  langPrefix: "",
}

const renderers = {
  ...DEFAULT_MARKDOWN_RENDERERS,

  codeblock: function ({ lang: alias, text, children: propChildren }) {
    const { langPrefix, highlightCode, highlightElement } = useMarkdownConfig()

    let key
    let children
    let dangerouslySetInnerHTML

    const delimiter = ":"
    const info = alias.split(delimiter)
    const lang = info.shift()
    const title = info.join(delimiter) // 2つ目以降のdelimiterはファイル名として扱う
    const codeClassName = lang ? `${langPrefix}${lang}` : undefined

    const Title = () => {
      return (
        <span class="inline-block py-1.5 px-3 text-white text-xs bg-slate-600 rounded-md rounded-b-none">
          {title}
        </span>
      )
    }

    if (highlightCode) {
      dangerouslySetInnerHTML = {
        __html: highlightCode(text, lang),
      }
    } else {
      children = propChildren

      if (highlightElement) {
        key = `${text}${lang}`
      }
    }

    return (
      <div className="!mt-6">
        {title && <Title />}
        <pre key={key} className={`!mt-0 ${title ? "!rounded-tl-none" : ""}`}>
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
  },
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
