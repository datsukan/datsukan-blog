const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  // 各記事ページ生成
  await createArticlePages(graphql, actions)

  // カテゴリー別記事一覧ページ生成
  await createArticleListPagesByCategory(graphql, actions)
}

// 各記事ページ生成
async function createArticlePages(graphql, actions) {
  const { createPage } = actions

  const result = await graphql(
    `
      {
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
              category {
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

// 各記事ページ生成
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
