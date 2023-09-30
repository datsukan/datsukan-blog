require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `datsukan blog`,
    author: {
      name: `datsukan`,
      summary: `%d歳。埼玉県在住。東京都のSaaS企業でバックエンドエンジニアとして勤務しています。`,
    },
    description: `datsukanのエンジニアリング、日常、趣味、思考などを吐き出すブログです。`,
    siteUrl: `https://blog.datsukan.me/`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GOOGLE_ANALYTICS_TRACKING_ID],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
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
            serialize: ({ query: { site, allContentfulArticle } }) => {
              return allContentfulArticle.nodes.map(article => {
                const url = `${site.siteMetadata.siteUrl}/${article.slug}`
                return {
                  title: article.title,
                  description: article.description,
                  date: article.createdAt,
                  url: url,
                  guid: url,
                }
              })
            },
            query: `
              {
                allContentfulArticle(sort: { fields: [createdAt], order: DESC }) {
                  nodes {
                    slug
                    createdAt
                    title
                    description
                  }
                }
              }
            `,
            output: "/feed.rss",
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
          "@types": "src/types",
          "@styles": "src/styles",
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
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        typekit: {
          id: process.env.TYPEKIT_ID,
        },
      },
    },
    {
      resolve: `@isamrish/gatsby-plugin-google-adsense`,
      options: {
        googleAdClientId: "ca-pub-4435913134683646",
        head: true,
      },
    },
  ],
}
