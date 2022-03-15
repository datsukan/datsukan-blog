import * as React from "react"
import { graphql } from "gatsby"

import { DefaultLayout } from "@layouts/default"
import { Seo } from "@components/seo"
import { Hr } from "@components/hr"
import { CategoryBadge } from "@components/category-badge"
import { TagBadge } from "@components/tag-badge"
import { ArticleHero } from "@components/article/hero"
import { ArticlesBeforeAndAfter } from "@components/article/articles-before-and-after"
import { PassedOneYearCard } from "@components/article/passed-one-year-card"
import { ShareLinkRowList } from "@components/share/link-row-list"
import { TableOfContents } from "@components/article/table-of-contents"
import { ArticleMarkdownRenderer } from "@components/article-markdown/renderer"
import {
  PublishedAtLabel,
  UpdatedAtLabel,
} from "@components/article/datetime-label"

import { hasPassedOneYear } from "@utils/datetime-diff"

import { currentURL } from "@utils/current-url"
import { twemojiURL } from "@utils/twemoji-url"

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
      <CategoryBadge name={category.name}>{category.label}</CategoryBadge>
      {tags &&
        tags.map(tag => (
          <TagBadge key={tag.name} name={tag.name}>
            {tag.label}
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

const BlogArticleTemplate = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title
  const url = currentURL(location)
  const article = data.microcmsArticle
  const imageUrl = twemojiURL(article.emoji)

  const { previous, next } = pageContext

  return (
    <DefaultLayout location={location} title={siteTitle} article={article}>
      <Seo
        title={article.title}
        description={article.description}
        image={imageUrl}
      />
      <article itemScope itemType="http://schema.org/Article">
        <header>
          {/* 記事のイメージ */}
          <ArticleHero emoji={article.emoji} />

          {/* 記事のタイトル */}
          <ArticleTitle title={article.title} className="mt-12" />

          {/* 投稿日時 */}
          <PublishedAtLabel
            publishedAt={article.publishedAt}
            formattedPublishedAt={article.formattedPublishedAt}
            className="mt-5"
          />

          {/* 更新日時 */}
          <UpdatedAtLabel
            updatedAt={article.updatedAt}
            formattedUpdatedAt={article.formattedUpdatedAt}
            className="mt-2"
          />

          {/* 記事のバッジ（カテゴリー＆タグ） */}
          <ArticleBadges
            category={article.category}
            tags={article.tags}
            className="mt-12"
          />

          {/* 投稿後1年以上経過している場合は注意表示を行う */}
          {hasPassedOneYear(article.publishedAt) && (
            <PassedOneYearCard className="mt-5" />
          )}

          {/* 目次 */}
          <TableOfContentsCard
            article={article}
            className="block md:hidden mt-10 mb-20 "
          />
        </header>

        <Hr className="hidden md:block my-20" />

        <section className="article-body" itemProp="articleBody">
          <ArticleMarkdownRenderer markdown={article.body} />
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
  query ($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    microcmsArticle(id: { eq: $id }) {
      id
      articleId
      createdAt
      publishedAt
      updatedAt
      formattedPublishedAt: publishedAt(formatString: "YYYY.MM.DD")
      formattedUpdatedAt: updatedAt(formatString: "YYYY.MM.DD")
      revisedAt
      title
      description
      emoji
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
