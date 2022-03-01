import * as React from "react"
import { graphql } from "gatsby"

import Layout from "@components/layout/index"
import Seo from "@components/seo"
import { ArticleCard } from "@components/article-card"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const articles = data.allMicrocmsArticle.edges

  if (articles.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="" />
        <p>まだ投稿された記事がありません。</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
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
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMicrocmsArticle(sort: { fields: [publishedAt], order: DESC }) {
      edges {
        node {
          id
          createdAt
          updatedAt
          formattedPublishedAt: publishedAt(formatString: "YYYY/MM/DD")
          diffYearsPublishedAt: publishedAt(difference: "years")
          diffMonthsPublishedAt: publishedAt(difference: "months")
          diffWeeksPublishedAt: publishedAt(difference: "weeks")
          diffDaysPublishedAt: publishedAt(difference: "days")
          diffHoursPublishedAt: publishedAt(difference: "hours")
          diffMinutesPublishedAt: publishedAt(difference: "minutes")
          diffSecondsPublishedAt: publishedAt(difference: "seconds")
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
          tags {
            name
            label
          }
        }
      }
    }
  }
`
