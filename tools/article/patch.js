require("dotenv").config({
  path: `.env.development`,
})
const fs = require("fs").promises
const axios = require("axios")

const token = process.env.MICROCMS_API_KEY
const baseEndpoint = `${process.env.MICROCMS_END_POINT}article/`

const headers = {
  "X-MICROCMS-API-KEY": token,
  "Content-Type": "application/json",
}

const saveDir = `${__dirname}/../../articles/`

const id = process.argv[2]

// 処理実行
main()

async function main() {
  try {
    if (!(await validate())) {
      console.warn("入力値が不正のため終了しました。")
      return
    }
    await updateArticle()
  } catch (error) {
    console.error(error)
    console.log("異常終了しました。")
  }
}

async function validate() {
  if (!id) {
    console.warn("第1引数にidを指定してください。")
    return false
  }

  if (!(await exists())) {
    console.warn("第1引数に存在する正しいidを指定してください。")
    return false
  }

  return true
}

async function exists() {
  // ファイル名を全件取得する
  const filenames = await getFilenames()

  // 記事として有効なファイル名だけ抽出する
  const articleFilenames = filenames.filter(filename => {
    const strArr = filename.split("--")
    if (strArr.length < 3) return false

    const name = strArr[1]
    const id = strArr[2]

    return !!name && !!id
  })

  let exists = false
  articleFilenames.map(filename => {
    const strArr = filename.split("--")
    const compId = strArr[2].replace(".md", "")

    if (id === compId) exists = true
  })

  return exists
}

async function updateArticle() {
  const body = await getFileBody()
  if (body === null) {
    console.log("指定されたidに問題があったため処理を中断します。")
    return
  }

  const options = {
    headers: headers,
  }
  const reqParams = { body: body }

  try {
    await axios.patch(`${baseEndpoint}${id}`, reqParams, options)
    console.warn("記事の更新が完了しました。")

    return
  } catch (error) {
    const { status, statusText, data } = error.response
    console.log(
      `Error! HTTP Status: ${status} ${statusText} ${JSON.stringify(data)}`
    )
    console.warn("更新でエラーが発生しました。")

    return
  }
}

async function getFileBody() {
  const filename = await getFilename()
  if (filename === null) return null

  const body = await fs.readFile(`${saveDir}${filename}`, "utf-8")
  return body
}

async function getFilename() {
  // ファイル名を全件取得する
  const filenames = await getFilenames()

  // 記事として有効かつ指定されたidのファイル名だけ抽出する
  const targetId = id
  const articleFilenames = filenames.filter(filename => {
    const strArr = filename.split("--")
    if (strArr.length < 3) return false

    const name = strArr[1]
    const id = strArr[2].replace(".md", "")

    return !!name && !!id && targetId === id
  })

  if (articleFilenames.length === 0) return null

  return articleFilenames[0]
}

async function getFilenames() {
  return await fs.readdir(saveDir)
}
