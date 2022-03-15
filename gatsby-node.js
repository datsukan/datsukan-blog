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
        allMicrocmsArticle(sort: { fields: [publishedAt], order: DESC }) {
          edges {
            node {
              id
              createdAt
              updatedAt
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
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const articles = result.data.allMicrocmsArticle.edges

  articles.forEach((article, index) => {
    const previous =
      index === articles.length - 1 ? null : articles[index + 1].node
    const next = index === 0 ? null : articles[index - 1].node

    createPage({
      path: article.node.id,
      component: path.resolve("./src/templates/article.js"),
      context: {
        id: article.node.id,
        previous,
        next,
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
        allMicrocmsCategory {
          edges {
            node {
              id
              name
              label
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const categories = result.data.allMicrocmsCategory.edges

  categories.forEach(category => {
    createPage({
      path: `/category/${category.node.name}`,
      component: path.resolve("./src/templates/articles-by-category.js"),
      context: {
        categoryName: category.node.name,
        categoryLabel: category.node.label,
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
        allMicrocmsTag {
          edges {
            node {
              id
              name
              label
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const tags = result.data.allMicrocmsTag.edges

  tags.forEach(tag => {
    createPage({
      path: `/tag/${tag.node.name}`,
      component: path.resolve("./src/templates/articles-by-tag.js"),
      context: {
        tagName: tag.node.name,
        tagLabel: tag.node.label,
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
