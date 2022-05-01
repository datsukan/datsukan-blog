// @ts-nocheck
import type { Node } from "unist"
import { visit } from "unist-util-visit"
import { h } from "hastscript"

export default function remarkCustomDirective() {
  return transformer

  function transformer(tree: Node) {
    visit(tree, visitor)

    function visitor(node: Node) {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        const data = node.data || (node.data = {})
        const hast = h(node.name, node.attributes)

        data.hName = hast.tagName
        data.hProperties = hast.properties
      }
    }
  }
}
