const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
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

  result.data.allMicrocmsArticle.edges.forEach((post, index) => {
    const previous =
      index === articles.length - 1 ? null : articles[index + 1].node
    const next = index === 0 ? null : articles[index - 1].node

    createPage({
      path: post.node.id,
      component: path.resolve("./src/templates/blog-post.js"),
      context: {
        id: post.node.id,
        previous,
        next,
      },
    })
  })
}
