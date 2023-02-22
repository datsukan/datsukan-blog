import { useStaticQuery, graphql } from "gatsby"
import { TagBadge } from "@components/TagBadge"

import type { Tag } from "@my-types/tag"

type Props = {
  className?: string
}
export const Tags = ({ className = "" }: Props) => {
  type Node = Tag & {
    id: string
  }
  type DataProps = {
    allContentfulTag: {
      nodes: Node[]
    }
  }
  const data = useStaticQuery<DataProps>(graphql`
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
      <div className="mt-5 flex max-h-24 flex-wrap gap-2 overflow-hidden md:max-h-full">
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
