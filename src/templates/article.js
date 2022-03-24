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
import { ArticleMarkdownRenderer } from "@components/article-markdown/renderer"
import {
  CreatedAtLabel,
  UpdatedAtLabel,
} from "@components/article/datetime-label"

import { hasPassedOneYear, getNumberOfYearsPassed } from "@utils/datetime-diff"

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
    <div className={`p-4 ring-1 ring-tertiary rounded ${className}`}>
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
          {/* 記事のイメージ */}
          <ArticleHero emoji={article.emoji} />

          {/* 記事のタイトル */}
          <ArticleTitle title={article.title} className="mt-12" />

          {/* 投稿日時 */}
          <CreatedAtLabel
            createdAt={article.createdAt}
            formattedCreatedAt={article.formattedCreatedAt}
            createdAtFromNow={article.createdAtFromNow}
            className="mt-5"
          />

          {/* 更新日時 */}
          <UpdatedAtLabel
            updatedAt={article.updatedAt}
            formattedUpdatedAt={article.formattedUpdatedAt}
            updatedAtFromNow={article.updatedAtFromNow}
            className="mt-2"
          />

          {/* 記事のバッジ（カテゴリー＆タグ） */}
          <ArticleBadges
            category={article.category}
            tags={article.tags}
            className="mt-12"
          />

          {/* 開発カテゴリで投稿後1年以上経過している場合は注意表示を行う */}
          {alertIsRequired && (
            <PassedNYearCard
              className="mt-5"
              year={getNumberOfYearsPassed(article.createdAt)}
            />
          )}

          {/* 目次 */}
          <TableOfContentsCard
            article={article}
            className="block md:hidden mt-10 mb-20 "
          />
        </header>
        <Hr className="hidden md:block my-20" />
        <section className="article-body" itemProp="articleBody">
          <ArticleMarkdownRenderer markdown={article.body.body} />
        </section>
      </article>

      {/* シェアリンクの横並びリスト */}
      <ShareLinkRowList
        className="my-20 xl:hidden"
        articleID={article.id}
        url={url}
      />

      <Hr className="mt-20" />

      {/* 前後の記事 */}
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
    contentfulArticle(id: { eq: $id }) {
      id
      slug
      createdAt
      updatedAt
      formattedCreatedAt: createdAt(formatString: "YYYY.MM.DD")
      formattedUpdatedAt: updatedAt(formatString: "YYYY.MM.DD")
      createdAtFromNow: createdAt(locale: "ja", fromNow: true)
      updatedAtFromNow: updatedAt(locale: "ja", fromNow: true)
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
    previous: contentfulArticle(id: { eq: $previousArticleId }) {
      id
      slug
      formattedCreatedAt: createdAt(formatString: "YYYY.MM.DD")
      createdAtFromNow: createdAt(locale: "ja", fromNow: true)
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
    next: contentfulArticle(id: { eq: $nextArticleId }) {
      id
      slug
      formattedCreatedAt: createdAt(formatString: "YYYY.MM.DD")
      createdAtFromNow: createdAt(locale: "ja", fromNow: true)
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
