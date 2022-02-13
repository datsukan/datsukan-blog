import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const article = data.microcmsArticle
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={article.title} description={article.description} />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{article.title}</h1>
          <p>{article.publishedAt}</p>
          {article.featuredImage && (
            <img
              src={article.featuredImage.url}
              width="100%"
              height="auto"
              alt="featured"
            />
          )}
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: article.body }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/${previous.id}`} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next.id}`} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    microcmsArticle(id: { eq: $id }) {
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
`
