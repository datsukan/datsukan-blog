const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  // 各記事ページ生成
  await createArticlePages(graphql, actions)

  // カテゴリー別記事一覧ページ生成
  await createArticleListPagesByCategory(graphql, actions)

  // タグ別記事一覧ページ生成
  await createArticleListPagesByTag(graphql, actions)
}

// 各記事ページ生成
async function createArticlePages(graphql, actions) {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allContentfulArticle(sort: { fields: [createdAt], order: DESC }) {
          nodes {
            id
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const articles = result.data.allContentfulArticle.nodes

  articles.forEach((article, index) => {
    const previousArticleId =
      index === articles.length - 1 ? null : articles[index + 1].id
    const nextArticleId = index === 0 ? null : articles[index - 1].id

    createPage({
      path: article.slug,
      component: path.resolve("./src/templates/article.js"),
      context: {
        id: article.id,
        previousArticleId,
        nextArticleId,
      },
    })
  })
}

// カテゴリー別記事ページ生成
async function createArticleListPagesByCategory(graphql, actions) {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allContentfulCategory {
          nodes {
            id
            slug
            name
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const categories = result.data.allContentfulCategory.nodes

  categories.forEach(category => {
    createPage({
      path: `/category/${category.slug}`,
      component: path.resolve("./src/templates/articles-by-category.js"),
      context: {
        categoryId: category.id,
        categorySlug: category.slug,
        categoryName: category.name,
      },
    })
  })
}

// タグ別記事ページ生成
async function createArticleListPagesByTag(graphql, actions) {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allContentfulTag {
          nodes {
            id
            slug
            name
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const tags = result.data.allContentfulTag.nodes

  tags.forEach(tag => {
    createPage({
      path: `/tag/${tag.slug}`,
      component: path.resolve("./src/templates/articles-by-tag.js"),
      context: {
        tagId: tag.id,
        tagSlug: tag.slug,
        tagName: tag.name,
      },
    })
  })
}

// Webpackの警告回避
exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === "develop" || stage === "build-javascript") {
    const config = getConfig()
    const miniCssExtractPlugin = config.plugins.find(
      plugin => plugin.constructor.name === "MiniCssExtractPlugin"
    )
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }
    actions.replaceWebpackConfig(config)
  }
}
