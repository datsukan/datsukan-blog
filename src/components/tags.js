import { useStaticQuery, graphql } from "gatsby"
import { TagBadge } from "@components/tag-badge"

export const Tags = ({ className = "" }) => {
  const data = useStaticQuery(graphql`
    {
      allContentfulTag(sort: { fields: [name], order: ASC }) {
        nodes {
          id: contentful_id
          slug
          name
        }
      }
    }
  `)

  const tags = data.allContentfulTag.nodes

  return (
    <div className={className}>
      <span className="text-md font-bold">記事のタグ</span>
      <div className="mt-5 max-h-24 md:max-h-full flex flex-wrap gap-2 overflow-hidden">
        {tags.map(tag => {
          return (
            <TagBadge key={tag.id} slug={tag.slug}>
              {tag.name}
            </TagBadge>
          )
        })}
      </div>
    </div>
  )
}
