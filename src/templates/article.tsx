import * as React from "react"
import { graphql } from "gatsby"
import type { PageProps } from "gatsby"

import { DefaultLayout } from "@layouts/default"
import { Seo } from "@components/Seo"
import { Hr } from "@components/Hr"
import { CategoryBadge } from "@components/CategoryBadge"
import { TagBadge } from "@components/TagBadge"
import { ArticleHero } from "@components/article/Hero"
import { ArticlesBeforeAndAfter } from "@components/article/ArticlesBeforeAndAfter"
import { PassedNYearCard } from "@components/article/PassedNYearCard"
import { ShareLinkRowList } from "@components/share/LinkRowList"
import { TableOfContents } from "@components/article/TableOfContents"
import { ArticleMarkdown } from "datsukan-blog-markdown"
import {
  CreatedAtLabel,
  UpdatedAtLabel,
} from "@components/article/DatetimeLabel"
import { GoodBadge } from "@components/article/GoodBadge"
import { CommentBadge } from "@components/article/CommentBadge"
import { AdsenseLandscape } from "@components/adsense/Landscape"
import { Comment } from "@components/comment"

import {
  generateDiffLabel,
  hasPassedOneYear,
  getNumberOfYearsPassed,
} from "@utils/datetime-diff"

import { currentURL } from "@utils/current-url"

import type { Article } from "@my-types/article"
import type { Category } from "@my-types/category"
import type { Tag } from "@my-types/tag"

type ArticleTitleProps = {
  className: string
  title: string
}
const ArticleTitle = ({ className = "", title }: ArticleTitleProps) => {
  return (
    <h1
      itemProp="headline"
      className={`break-words text-3xl font-bold ${className}`}
    >
      {title}
    </h1>
  )
}

type ArticleBadgesProps = {
  className: string
  category: Category
  tags: Tag[]
}
const ArticleBadges = ({
  className = "",
  category,
  tags,
}: ArticleBadgesProps) => {
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

type TableOfContentsCardProps = {
  className: string
  article: Article
}
const TableOfContentsCard = ({
  className = "",
  article,
}: TableOfContentsCardProps) => {
  return (
    <div className={`rounded p-4 ring-1 ring-tertiary ${className}`}>
      <TableOfContents article={article} />
    </div>
  )
}

type DataProps = {
  contentfulArticle: Article
  previous: Article
  next: Article
}
const BlogArticleTemplate = ({ data, location }: PageProps<DataProps>) => {
  const path = location.pathname
  const url = currentURL(location)
  const article = data.contentfulArticle
  const alertIsRequired =
    hasPassedOneYear(article.createdAt) &&
    article.category.slug === "development"

  const { previous, next } = data

  return (
    <DefaultLayout location={location} article={article}>
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
          <ArticleTitle title={article.title} className="mt-12 leading-10" />

          {/* 投稿日時 */}
          <CreatedAtLabel
            createdAt={article.createdAt}
            formattedCreatedAt={article.formattedCreatedAt}
            createdAtFromNow={generateDiffLabel(article.createdAt)}
            className="mt-5"
          />

          {/* 更新日時 */}
          <UpdatedAtLabel
            updatedAt={article.updatedAt}
            formattedUpdatedAt={article.formattedUpdatedAt}
            updatedAtFromNow={generateDiffLabel(article.updatedAt)}
            className="mt-2"
          />

          <div className="mt-2 flex flex-col gap-2">
            {/* いいね数 */}
            <GoodBadge articleID={article.id} />

            {/* コメント数 */}
            <CommentBadge articleId={article.id} />
          </div>

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
            className="mt-10 mb-20 block md:hidden"
          />
        </header>
        <Hr className="my-20 hidden md:block" />
        <section itemProp="articleBody">
          <ArticleMarkdown text={article.body.body} />
        </section>
      </article>

      {/* コメント */}
      <div className="mt-20">
        <Comment articleId={article.id} />
      </div>

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

      <AdsenseLandscape className="my-20" path={path} />
    </DefaultLayout>
  )
}

export default BlogArticleTemplate

export const pageQuery = graphql`
  query ($id: String!, $previousArticleId: String, $nextArticleId: String) {
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
