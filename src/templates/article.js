import * as React from "react"
import { graphql } from "gatsby"

import { DefaultLayout } from "@layouts/default"
import { Seo } from "@components/seo"
import { ArticleLink } from "@components/article-link"
import { Hr } from "@components/hr"
import { CategoryBadge } from "@components/category-badge"
import { TagBadge } from "@components/tag-badge"
import {
  generateDiffLabel,
  hasPassedOneYear,
} from "@utils/diff-from-published-at"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

import "@css/article-body.css"
import "prismjs/themes/prism.css" // Highlighting for code blocks

const BlogArticleTemplate = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title
  const article = data.microcmsArticle
  const { previous, next } = pageContext

  return (
    <DefaultLayout location={location} title={siteTitle}>
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

          <div className="mt-5 flex flex-wrap gap-2">
            <CategoryBadge name={article.category.name}>
              {article.category.label}
            </CategoryBadge>
            {article.tags &&
              article.tags.map(tag => (
                <TagBadge key={tag.name} name={tag.name}>
                  {tag.label}
                </TagBadge>
              ))}
          </div>

          <p className="text-lg mt-5 text-secondary">
            {article.formattedPublishedAt} - {generateDiffLabel(article)}
          </p>

          {hasPassedOneYear(article) && (
            <div className="mt-5 p-4 bg-amber-100 rounded-lg">
              <p className="text-center">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="text-amber-400"
                />
                <span className="ml-2 text-sm">
                  この記事は投稿してから1年以上が経過しています。
                </span>
              </p>
            </div>
          )}
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
    </DefaultLayout>
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
        name
        label
      }
      tags {
        name
        label
      }
    }
  }
`
