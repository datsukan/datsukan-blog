require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `datsukan blog`,
    author: {
      name: `datsukan`,
      summary: `22歳。埼玉県在住。東京都のSaaS企業でバックエンドエンジニアとして勤務しています。エンジニアリング以外のことも記事にします。`,
    },
    description: `datsukanのエンジニアリング、日常、趣味、思考などを吐き出すブログです。`,
    siteUrl: `https://blog.datsukan.me/`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        head: true,
      },
    },
    {
      resolve: "gatsby-source-microcms",
      options: {
        apiKey: process.env.MICROCMS_API_KEY,
        serviceId: process.env.MICROCMS_SERVICE_ID,
        apis: [
          {
            endpoint: "article",
          },
          {
            endpoint: "category",
          },
          {
            endpoint: "tag",
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMicrocmsArticle } }) => {
              return allMicrocmsArticle.edges.map(article => {
                return {
                  title: article.node.title,
                  description: article.node.description,
                  date: article.node.publishedAt,
                  url: site.siteMetadata.siteUrl + article.node.articleId,
                  guid: site.siteMetadata.siteUrl + article.node.articleId,
                }
              })
            },
            query: `
              {
                allMicrocmsArticle(sort: { fields: [publishedAt], order: DESC }) {
                  edges {
                    node {
                      articleId
                      publishedAt
                      updatedAt
                      title
                      description
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "datsukan blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `datsukan blog`,
        short_name: `datsukan blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/avatar-transparent.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@src": "src",
          "@components": "src/components",
          "@layouts": "src/layouts",
          "@pages": "src/pages",
          "@css": "src/css",
          "@templates": "src/templates",
          "@images": "src/images",
          "@utils": "src/utils",
        },
        extensions: ["js", "jsx", "ts", "tsx"],
      },
    },
    `gatsby-plugin-provide-react`,
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: process.env.TYPEKIT_ID,
        },
      },
    },
  ],
}
