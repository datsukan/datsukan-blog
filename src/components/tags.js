import { useStaticQuery, graphql } from "gatsby"
import { TagBadge } from "@components/tag-badge"

export const Tags = ({ className }) => {
  const data = useStaticQuery(graphql`
    {
      allMicrocmsTag(sort: { fields: [name], order: ASC }) {
        edges {
          node {
            id
            name
            label
          }
        }
      }
    }
  `)

  const tags = data.allMicrocmsTag.edges

  return (
    <div className={className}>
      <span className="text-md font-bold">記事のタグ</span>
      <div className="mt-5 max-h-24 md:max-h-full flex flex-wrap gap-2 overflow-hidden">
        {tags.map(({ node }) => {
          const tag = node
          return (
            <TagBadge key={tag.name} name={tag.name}>
              {tag.label}
            </TagBadge>
          )
        })}
      </div>
    </div>
  )
}
