import * as React from "react"
import { graphql } from "gatsby"

import Layout from "@components/layout/index"
import Seo from "@components/seo"
import { ArticleCard } from "@components/article-card"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const articles = data.allMicrocmsArticle.edges
  const { categoryLabel } = pageContext

  if (articles.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title={categoryLabel} />

        <h1 className="text-2xl font-bold">{categoryLabel}</h1>
        <p className="mt-7">まだ投稿された記事がありません。</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={categoryLabel} />

      <h1 className="text-2xl font-bold">{categoryLabel}</h1>
      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {articles.map(item => {
          const article = item.node

          return <ArticleCard article={article} key={article.id} />
        })}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query ($categoryName: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMicrocmsArticle(filter: { category: { name: { eq: $categoryName } } }) {
      edges {
        node {
          id
          createdAt
          updatedAt
          publishedAt(formatString: "YYYY/MM/DD")
          revisedAt
          title
          description
          featuredImage {
            url
            height
            width
          }
          body
          category {
            id
            name
            label
            order
          }
        }
      }
    }
  }
`
