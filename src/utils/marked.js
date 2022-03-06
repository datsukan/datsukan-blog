import { marked } from "marked"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"

// rendererを生成する
function generateRenderer() {
  let renderer = new marked.Renderer()
  renderer.code = function (code, infoString, escaped) {
    const delimiter = ":"
    const info = infoString.split(delimiter)
    const lang = info.shift()
    const fileName = info.join(delimiter) // 2つ目以降のdelimiterはファイル名として扱う
    let fileTag = ""
    let preClass = ""
    if (fileName) {
      fileTag =
        '<div class="h-4 text-white mb-6">' +
        '<span class="inline-block py-0.5 px-3 bg-slate-600">' +
        fileName +
        "</span>" +
        "</div>"

      preClass = "!pt-0"
    }

    if (this.options.highlight) {
      let out = this.options.highlight(code, lang)
      if (out != null && out !== code) {
        escaped = true
        code = out
      }
    }

    if (!lang) {
      return (
        `<pre class="${preClass}">` +
        fileTag +
        "<code>" +
        (escaped ? code : escape(code, true)) +
        "\n</code></pre>"
      )
    }

    return (
      `<pre class="${preClass}">` +
      fileTag +
      '<code class="' +
      this.options.langPrefix +
      escape(lang, true) +
      '">' +
      (escaped ? code : escape(code, true)) +
      "\n</code></pre>\n"
    )
  }

  return renderer
}

// オプションを生成する
function generateOptions() {
  const renderer = generateRenderer()

  const markedOptions = {
    breaks: true,
    langPrefix: "",
    // highlightjsを使用したハイライト処理を追加
    highlight: function (code, lang) {
      return hljs.highlightAuto(code, [lang]).value
    },
    renderer: renderer,
  }

  return markedOptions
}

// 新しいmarkedインスタンスを生成する
export function newMarked() {
  const markedOptions = generateOptions()
  marked.setOptions(markedOptions)

  return marked
}
