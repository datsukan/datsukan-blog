import { graphql } from "gatsby"
import type { PageProps } from "gatsby"

import { ArticlesLayout } from "@layouts/articles"
import type { Article } from "@my-types/article"
import type { Context as CategoryContext } from "@my-types/category"

type DataProps = {
  allContentfulArticle: {
    nodes: Article[]
  }
}

type ContextProps = CategoryContext

const BlogIndex = ({
  data,
  location,
  pageContext,
}: PageProps<DataProps, ContextProps>) => {
  const articles = data.allContentfulArticle.nodes
  const { categoryName } = pageContext

  return (
    <ArticlesLayout
      location={location}
      pageTitle={categoryName}
      articles={articles}
    />
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query ($categoryId: String!) {
    allContentfulArticle(
      sort: { fields: [createdAt], order: DESC }
      filter: { category: { contentful_id: { eq: $categoryId } } }
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
