import { graphql } from "gatsby"
import { ArticlesLayout } from "@layouts/articles"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title
  const articles = data.allMicrocmsArticle.edges

  return (
    <ArticlesLayout
      location={location}
      siteTitle={siteTitle}
      pageTitle=""
      articles={articles}
    />
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
