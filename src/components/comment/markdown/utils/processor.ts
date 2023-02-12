import React from "react"
import { unified } from "unified"
import remarkParser from "remark-parse"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"
import remarkDirective from "remark-directive"
import remarkCustomDirective from "./plugins/remarkCustomDirective"
import remarkRehype from "remark-rehype"
import rehypeCodeTitle from "./plugins/rehypeCodeTitle"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import rehypeReact from "rehype-react"

import "highlight.js/styles/atom-one-dark.css"

import {
  NormalMessage,
  InfoMessage,
  WarnMessage,
  AlertMessage,
} from "@components/comment/markdown/Message"
import { Link } from "@components/comment/markdown/Link"
import { Codeblock } from "@components/comment/markdown/Codeblock"
import { Image } from "@components/comment/markdown/Image"
import { Checkbox } from "@components/comment/markdown/Checkbox"

const components: Record<string, any> = {
  pre: Codeblock,
  input: Checkbox,
  normal: NormalMessage,
  info: InfoMessage,
  warn: WarnMessage,
  alert: AlertMessage,
  img: Image,
  a: Link,
}

const processor = unified()
  .use(remarkParser)
  .use(remarkBreaks)
  .use(remarkGfm)
  .use(remarkDirective)
  .use(remarkCustomDirective)
  .use(remarkRehype)
  .use(rehypeCodeTitle)
  .use(rehypeHighlight, { subset: false, ignoreMissing: true })
  .use(rehypeSlug)
  .use(rehypeReact, {
    Fragment: React.Fragment,
    createElement: React.createElement,
    components: components,
  })

export default processor
