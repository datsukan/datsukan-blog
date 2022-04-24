// @ts-nocheck
import type { Node } from "unist"
import { visit } from "unist-util-visit"

const delimiter = ":"

export default function customDirective() {
  return transformer

  function transformer(tree: Node) {
    visit(tree, "element", visitor)

    function visitor(node: Node) {
      if (
        node.tagName === "code" &&
        !!node.properties &&
        !!node.properties.className &&
        node.properties.className.length > 0
      ) {
        // console.log('rehype', node)
        const aliasList = node.properties.className[0].split(delimiter)
        node.properties.className[0] = aliasList.shift()
        if (aliasList.length === 0 || !aliasList[0]) return
        const title = aliasList.join(delimiter)
        node.properties.title = title
      }
    }

    return tree
  }
}
