import * as React from "react"
import { graphql } from "gatsby"

import { DefaultLayout } from "@layouts/default"
import { Seo } from "@components/seo"
import { Hr } from "@components/hr"
import { CategoryBadge } from "@components/category-badge"
import { TagBadge } from "@components/tag-badge"
import { ArticleHero } from "@components/article/hero"
import { ArticlesBeforeAndAfter } from "@components/article/articles-before-and-after"
import { PassedNYearCard } from "@components/article/passed-n-year-card"
import { ShareLinkRowList } from "@components/share/link-row-list"
import { TableOfContents } from "@components/article/table-of-contents"
// import { ArticleMarkdownRenderer } from "@components/article-markdown/renderer"
import { Markdown } from "@components/markdown"
import {
  CreatedAtLabel,
  UpdatedAtLabel,
} from "@components/article/datetime-label"

import {
  generateDiffLabel,
  hasPassedOneYear,
  getNumberOfYearsPassed,
} from "@utils/datetime-diff"

import { currentURL } from "@utils/current-url"

import "@css/article-body.css"

const ArticleTitle = ({ className = "", title }) => {
  return (
    <h1 itemProp="headline" className={`text-4xl font-bold ${className}`}>
      {title}
    </h1>
  )
}

const ArticleBadges = ({ className = "", category, tags }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <CategoryBadge slug={category.slug}>{category.name}</CategoryBadge>
      {tags &&
        tags.map(tag => (
          <TagBadge key={tag.slug} slug={tag.slug}>
            {tag.name}
          </TagBadge>
        ))}
    </div>
  )
}

const TableOfContentsCard = ({ className = "", article }) => {
  return (
    <div className={`rounded p-4 ring-1 ring-tertiary ${className}`}>
      <TableOfContents article={article} />
    </div>
  )
}

const BlogArticleTemplate = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title
  const url = currentURL(location)
  const article = data.contentfulArticle
  const alertIsRequired =
    hasPassedOneYear(article.createdAt) &&
    article.category.slug === "development"

  const { previous, next } = data

  return (
    <DefaultLayout location={location} title={siteTitle} article={article}>
      <Seo
        title={article.title}
        description={article.description}
        article={article}
      />
      <article itemScope itemType="http://schema.org/Article">
        <header>
          {/* ????????????????????? */}
          <ArticleHero emoji={article.emoji} />

          {/* ????????????????????? */}
          <ArticleTitle
            title={article.title}
            className="mt-12 leading-[3rem]"
          />

          {/* ???????????? */}
          <CreatedAtLabel
            createdAt={article.createdAt}
            formattedCreatedAt={article.formattedCreatedAt}
            createdAtFromNow={generateDiffLabel(article.createdAt)}
            className="mt-5"
          />

          {/* ???????????? */}
          <UpdatedAtLabel
            updatedAt={article.updatedAt}
            formattedUpdatedAt={article.formattedUpdatedAt}
            updatedAtFromNow={generateDiffLabel(article.updatedAt)}
            className="mt-2"
          />

          {/* ???????????????????????????????????????????????? */}
          <ArticleBadges
            category={article.category}
            tags={article.tags}
            className="mt-12"
          />

          {/* ??????????????????????????????1????????????????????????????????????????????????????????? */}
          {alertIsRequired && (
            <PassedNYearCard
              className="mt-5"
              year={getNumberOfYearsPassed(article.createdAt)}
            />
          )}

          {/* ?????? */}
          <TableOfContentsCard
            article={article}
            className="mt-10 mb-20 block md:hidden "
          />
        </header>
        <Hr className="my-20 hidden md:block" />
        <section className="article-body" itemProp="articleBody">
          {/* <ArticleMarkdownRenderer markdown={article.body.body} /> */}
          <Markdown text={article.body.body} />
        </section>
      </article>

      {/* ??????????????????????????????????????? */}
      <ShareLinkRowList
        className="my-20 xl:hidden"
        articleID={article.id}
        url={url}
      />

      <Hr className="mt-20" />

      {/* ??????????????? */}
      <ArticlesBeforeAndAfter
        className="my-20"
        previous={previous}
        next={next}
      />
    </DefaultLayout>
  )
}

export default BlogArticleTemplate

export const pageQuery = graphql`
  query ($id: String!, $previousArticleId: String, $nextArticleId: String) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulArticle(contentful_id: { eq: $id }) {
      id: contentful_id
      slug
      createdAt
      updatedAt
      formattedCreatedAt: createdAt(formatString: "YYYY.MM.DD")
      formattedUpdatedAt: updatedAt(formatString: "YYYY.MM.DD")
      title
      description
      emoji
      body {
        body
      }
      category {
        slug
        name
      }
      tags {
        slug
        name
      }
    }
    previous: contentfulArticle(contentful_id: { eq: $previousArticleId }) {
      id: contentful_id
      slug
      createdAt
      formattedCreatedAt: createdAt(formatString: "YYYY.MM.DD")
      title
      emoji
      category {
        slug
        name
      }
      tags {
        slug
        name
      }
    }
    next: contentfulArticle(contentful_id: { eq: $nextArticleId }) {
      id: contentful_id
      slug
      createdAt
      formattedCreatedAt: createdAt(formatString: "YYYY.MM.DD")
      title
      emoji
      category {
        slug
        name
      }
      tags {
        slug
        name
      }
    }
  }
`
