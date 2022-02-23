import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { ArticleLink } from "@components/article-link"
import { Hr } from "@components/hr"

const BlogArticleTemplate = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title
  const article = data.microcmsArticle
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={article.title} description={article.description} />
      <article itemScope itemType="http://schema.org/Article">
        <header>
          {article.featuredImage && (
            <div className="h-60 border-2 border-tertiary rounded-2xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={article.featuredImage.url}
                width="100%"
                height="auto"
                alt="featured"
              />
            </div>
          )}

          <h1
            itemProp="headline"
            className={`${article.featuredImage && "mt-10"} text-4xl font-bold`}
          >
            {article.title}
          </h1>
          <p className="text-lg mt-5 text-secondary">{article.publishedAt}</p>
        </header>
        <section
          className="mt-10 article-body"
          dangerouslySetInnerHTML={{ __html: article.body }}
          itemProp="articleBody"
        />
      </article>

      <Hr className="mt-20" />

      <nav className="my-20">
        <p className="text-lg font-bold">前後の記事</p>
        <ul className="mt-6 grid grid-cols-1 gap-6">
          <li>{previous && <ArticleLink article={previous} />}</li>
          <li>{next && <ArticleLink article={next} />}</li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogArticleTemplate

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
      category {
        label
      }
    }
  }
`
