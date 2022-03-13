import { useState, useCallback } from "react"
import {
  DEFAULT_MARKDOWN_OPTIONS,
  DEFAULT_MARKDOWN_RENDERERS,
  useMarkdownConfig,
  Markdown,
} from "react-marked-renderer"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy } from "@fortawesome/free-solid-svg-icons"

const Title = ({ className, title }) => {
  return (
    <span
      className={`py-1.5 px-3 text-white text-xs bg-slate-600 rounded-md rounded-b-none ${className}`}
    >
      {title}
    </span>
  )
}

const CopyButton = ({ className, text }) => {
  const [isInvisible, setIsInvisible] = useState(true)

  const copyToClipboard = copyText => {
    navigator.clipboard.writeText(copyText)
    if (!isInvisible) return

    setIsInvisible(false)
    setTimeout(() => setIsInvisible(true), 3000)
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => copyToClipboard(text)}
        className={`block relative p-2 rounded-md bg-white/20 hover:bg-white/40`}
      >
        <span
          role="tooltip"
          className={`
            absolute
            right-0
            -translate-y-12
            z-10
            py-1
            px-2
            text-xs
            font-medium
            text-white
            bg-gray-800
            rounded-lg
            shadow-sm
            transition-opacity
            duration-300
            ${isInvisible ? "invisible opacity-0" : "opacity-90"}
          `}
        >
          コピーしました
        </span>

        <FontAwesomeIcon
          icon={faCopy}
          width={16}
          height={16}
          className="block w-4 h-4"
        />
      </button>
    </div>
  )
}

const options = {
  ...DEFAULT_MARKDOWN_OPTIONS,

  breaks: true,
  langPrefix: "",
}

const renderers = {
  ...DEFAULT_MARKDOWN_RENDERERS,

  codeblock: function ({ lang: alias, text: code, children: propChildren }) {
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
        {title && <Title title={title} className="inline-block" />}
        <pre
          key={key}
          className={`
            !mt-0
            relative
            !overflow-visible
            ${title ? "!rounded-tl-none" : ""}
          `}
        >
          <CopyButton text={code} className="absolute top-2 right-2" />
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
