import * as React from "react"
import { graphql } from "gatsby"

import Layout from "@components/layout/index"
import Seo from "@components/seo"
import { ArticleCard } from "@components/article-card"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const articles = data.allMicrocmsArticle.edges
  const { tagLabel } = pageContext

  if (articles.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title={tagLabel} />

        <h1 className="text-2xl font-bold">{tagLabel}</h1>
        <p className="mt-7">まだ投稿された記事がありません。</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={tagLabel} />

      <h1 className="text-2xl font-bold">{tagLabel}</h1>
      <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-7">
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
  query ($tagName: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMicrocmsArticle(
      sort: { fields: [publishedAt], order: DESC }
      filter: { tags: { elemMatch: { name: { eq: $tagName } } } }
    ) {
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
