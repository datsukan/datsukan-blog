import { graphql } from "gatsby"

import { ArticlesLayout } from "@layouts/articles"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const articles = data.allMicrocmsArticle.edges
  const { categoryLabel } = pageContext

  return (
    <ArticlesLayout
      location={location}
      siteTitle={siteTitle}
      pageTitle={categoryLabel}
      articles={articles}
    />
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
    allMicrocmsArticle(
      sort: { fields: [publishedAt], order: DESC }
      filter: { category: { name: { eq: $categoryName } } }
    ) {
      edges {
        node {
          id
          createdAt
          updatedAt
          publishedAt
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
          emoji
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
