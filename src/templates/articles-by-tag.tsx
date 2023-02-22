import { graphql } from "gatsby"
import type { PageProps } from "gatsby"

import { ArticlesLayout } from "@layouts/articles"
import type { Article } from "@my-types/article"
import type { Context as TagContext } from "@my-types/tag"

type DataProps = {
  allContentfulArticle: {
    nodes: Article[]
  }
}

type ContextProps = TagContext

const BlogIndex = ({
  data,
  location,
  pageContext,
}: PageProps<DataProps, ContextProps>) => {
  const articles = data.allContentfulArticle.nodes
  const { tagName } = pageContext

  return (
    <ArticlesLayout
      location={location}
      pageTitle={tagName}
      articles={articles}
    />
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query ($tagId: String!) {
    allContentfulArticle(
      sort: { fields: [createdAt], order: DESC }
      filter: { tags: { elemMatch: { contentful_id: { eq: $tagId } } } }
    ) {
      nodes {
        id: contentful_id
        slug
        createdAt
        formattedCreatedAt: createdAt(formatString: "YYYY.MM.DD")
        title
        emoji
        category {
          slug
          name
        }
        tags {
          slug
          name
        }
      }
    }
  }
`
