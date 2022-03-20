require("dotenv").config({
  path: `.env.development`,
})
const fs = require("fs").promises
const axios = require("axios")
const dayjs = require("dayjs")

const token = process.env.MICROCMS_API_KEY
const baseEndpoint = `${process.env.MICROCMS_END_POINT}article/`

const headers = {
  "X-MICROCMS-API-KEY": token,
}

const saveDir = `${__dirname}/../../articles/`

const id = process.argv[2] ?? null
const draftKey = process.argv[3] ?? null

// 処理実行
main()

async function main() {
  try {
    const articles = !!id ? [await fetchArticle()] : await fetchArticles()
    await fileSave(articles)
  } catch (error) {
    console.error(error)
    console.log("異常終了しました。")
  }
}

async function fetchArticle() {
  const options = {
    headers: headers,
    params: {},
  }
  if (!!draftKey) options.params.draftKey = draftKey

  try {
    const res = await axios.get(`${baseEndpoint}${id}`, options)
    const content = res.data

    const article = {
      id: content.id,
      publishedAt: content.publishedAt,
      title: content.title,
      body: content.body,
    }

    return article
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)

    throw error
  }
}

async function fetchArticles() {
  const options = {
    headers: headers,
  }

  try {
    const res = await axios.get(baseEndpoint, options)
    const contents = res.data.contents

    let articles = []
    contents.map(content => {
      articles.push({
        id: content.id,
        publishedAt: content.publishedAt,
        title: content.title,
        body: content.body,
      })
    })

    return articles
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)

    return null
  }
}

async function fileSave(articles) {
  if (await dirExists()) {
    // ディレクトリが存在する場合は中のファイルを削除する
    await fileDelete()
    console.log("既存のファイルを削除しました。")
  } else {
    // ディレクトリが存在しない場合は作成する
    await fs.mkdir(saveDir, { recursive: true })
    console.log("ディレクトリを作成しました。")
  }

  let errorCount = 0
  const promises = articles.map(async article => {
    const formattedPublishedAt =
      "publishedAt" in article && !!article.publishedAt
        ? dayjs(article.publishedAt).format("YYYY-MM-DD")
        : "draft"
    const fileName = `${saveDir}${formattedPublishedAt}--${article.title}--${article.id}.md`

    // 書き込み
    await fs.writeFile(fileName, article.body, _ => errorCount++)
  })
  await Promise.all(promises)

  if (errorCount > 0) {
    console.error(`${errorCount}件の取得エラーが発生しました。`)
  } else {
    console.info("記事の取得が正常に終了しました。")
  }
}

async function fileDelete() {
  const files = await fs.readdir(saveDir)
  const promises = files.map(async file => {
    await fs.unlink(`${saveDir}/${file}`)
    console.log(`削除： ${file}`)
  })
  await Promise.all(promises)
}

async function dirExists() {
  try {
    return (await fs.lstat(saveDir)).isDirectory()
  } catch (e) {
    return false
  }
}
