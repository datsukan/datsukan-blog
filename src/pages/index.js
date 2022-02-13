import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMicrocmsArticle.edges

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>まだ投稿がありません。</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(item => {
          const article = item.node
          const title = article.title || article.id

          return (
            <li key={article.id}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={article.id} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{article.publishedAt}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: article.description,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
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
