import { graphql } from "gatsby"
import type { PageProps } from "gatsby"
import type { Article } from "@my-types/article"
import { ArticlesLayout } from "@layouts/articles"

type DataProps = {
  allContentfulArticle: {
    nodes: Article[]
  }
}

const BlogIndex = ({ data, location }: PageProps<DataProps>) => {
  const articles = data.allContentfulArticle.nodes

  return <ArticlesLayout location={location} articles={articles} />
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    allContentfulArticle(sort: { fields: [createdAt], order: DESC }) {
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
