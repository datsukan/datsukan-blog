import React from "react"
import { unified } from "unified"
import remarkParser from "remark-parse"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"
import remarkDirective from "remark-directive"
import customDirective from "./plugins/customDirective"
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
} from "@components/markdown/Message"
import { Link } from "@components/markdown/Link"
import { Codeblock } from "@components/markdown/Codeblock"
import { Image } from "@components/markdown/Image"
import { Header } from "@components/markdown/Header"
import { Checkbox } from "@components/markdown/Checkbox"

const components: Record<string, any> = {
  h1: (props: any) => Header({ ...props, depth: 1 }),
  h2: (props: any) => Header({ ...props, depth: 2 }),
  h3: (props: any) => Header({ ...props, depth: 3 }),
  h4: (props: any) => Header({ ...props, depth: 4 }),
  h5: (props: any) => Header({ ...props, depth: 5 }),
  h6: (props: any) => Header({ ...props, depth: 6 }),
  pre: Codeblock,
  input: Checkbox,
  normal: NormalMessage,
  info: InfoMessage,
  warn: WarnMessage,
  alert: AlertMessage,
  img: Image,
  // a: Link,
}

const processor = unified()
  .use(remarkParser)
  .use(remarkBreaks)
  .use(remarkGfm)
  .use(remarkDirective)
  .use(customDirective)
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
