import * as React from "react"
import { graphql } from "gatsby"
import { marked } from "marked"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"

import { DefaultLayout } from "@layouts/default"
import { Seo } from "@components/seo"
import { ArticleLink } from "@components/article-link"
import { Hr } from "@components/hr"
import { CategoryBadge } from "@components/category-badge"
import { TagBadge } from "@components/tag-badge"
import { ArticleHero } from "@components/article-hero"
import {
  generateDiffLabel,
  hasPassedOneYear,
} from "@utils/diff-from-published-at"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { TableOfContents } from "@components/table-of-contents"
import { GoodButton } from "@components/good-button"
import { ShareHatebuButton } from "@components/share-hatebu-button"
import { ShareTwitterButton } from "@components/share-twitter-button"
import { ShareFacebookButton } from "@components/share-facebook-button"

import { currentURL } from "@utils/current-url"
import { twemojiURL } from "@utils/twemoji-url"

import "@css/article-body.css"

let renderer = new marked.Renderer()
renderer.code = function (code, infoString, escaped) {
  const delimiter = ":"
  const info = infoString.split(delimiter)
  const lang = info.shift()
  const fileName = info.join(delimiter) // 2つ目以降のdelimiterはファイル名として扱う
  let fileTag = ""
  let preClass = ""
  if (fileName) {
    fileTag =
      '<div class="h-4 text-white mb-6">' +
      '<span class="inline-block py-0.5 px-3 bg-slate-600">' +
      fileName +
      "</span>" +
      "</div>"

    preClass = "!pt-0"
  }

  if (this.options.highlight) {
    let out = this.options.highlight(code, lang)
    if (out != null && out !== code) {
      escaped = true
      code = out
    }
  }

  if (!lang) {
    return (
      `<pre class="${preClass}">` +
      fileTag +
      "<code>" +
      (escaped ? code : escape(code, true)) +
      "\n</code></pre>"
    )
  }

  return (
    `<pre class="${preClass}">` +
    fileTag +
    '<code class="' +
    this.options.langPrefix +
    escape(lang, true) +
    '">' +
    (escaped ? code : escape(code, true)) +
    "\n</code></pre>\n"
  )
}

const BlogArticleTemplate = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title
  const url = currentURL(location)
  const article = data.microcmsArticle
  const imageUrl = twemojiURL(article.emoji)

  const markedOptions = {
    breaks: true,
    langPrefix: "",
    // highlightjsを使用したハイライト処理を追加
    highlight: function (code, lang) {
      return hljs.highlightAuto(code, [lang]).value
    },
    renderer: renderer,
  }
  marked.setOptions(markedOptions)

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
          <ArticleHero emoji={article.emoji} />

          <h1 itemProp="headline" className="mt-12 text-4xl font-bold">
            {article.title}
          </h1>

          <div className="mt-12 flex flex-wrap gap-2">
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

          <p className="text-md mt-5 text-secondary">
            <time dateTime={article.publishedAt}>
              {article.formattedPublishedAt} - {generateDiffLabel(article)}
            </time>
          </p>

          {hasPassedOneYear(article) && (
            <div className="mt-5 p-4 bg-amber-100 rounded-lg">
              <p className="text-center">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  width={14}
                  height={14}
                  className="text-amber-400 inline-block"
                />
                <span className="ml-2 text-sm">
                  この記事は投稿してから1年以上が経過しています。
                </span>
              </p>
            </div>
          )}

          <div className="block md:hidden mt-10 mb-20 p-4 ring-1 ring-tertiary rounded">
            <TableOfContents article={article} />
          </div>
        </header>

        <Hr className="hidden md:block my-20" />

        <section
          className="article-body"
          dangerouslySetInnerHTML={{
            __html: marked(article.body),
          }}
          itemProp="articleBody"
        />
      </article>

      <div className="xl:hidden my-20 flex flex-wrap justify-center gap-4">
        <GoodButton articleID={article.id} className="mr-3" />
        <ShareHatebuButton url={url} />
        <ShareTwitterButton url={url} />
        <ShareFacebookButton url={url} />
      </div>

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
      publishedAt
      formattedPublishedAt: publishedAt(formatString: "YYYY/MM/DD")
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
