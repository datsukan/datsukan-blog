import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "@components/layout/index"
import Seo from "@components/seo"
import { ArticleCard } from "@components/article-card"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMicrocmsArticle.edges

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>まだ投稿がありません。</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />

      <div className="grid grid-cols-3 gap-7">
        {posts.map(item => {
          const article = item.node

          return <ArticleCard article={article} />
        })}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMicrocmsArticle {
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
        }
      }
    }
  }
`
