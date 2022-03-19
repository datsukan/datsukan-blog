const fs = require("fs").promises

const saveDir = `${__dirname}/../../articles/`

const action = process.argv[2]

// 処理実行
main()

async function main() {
  try {
    if (!validate()) {
      console.warn("入力値が不正のため終了しました。")
      return
    }

    switch (action) {
      case "get":
        await printFileInfo()
        console.log("記事のidを全件表示 完了")
        break
    }
  } catch (error) {
    console.error(error)
    console.log("異常終了しました。")
  }
}

function validate() {
  if (!action || action !== "get") {
    console.warn("第1引数にアクションを指定してください。")
    return false
  }

  return true
}

async function printFileInfo() {
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

  let infos = []
  articleFilenames.map(filename => {
    const strArr = filename.split("--")
    const publishedAt = strArr[0]
    const name = strArr[1]
    const id = strArr[2].replace(".md", "")

    infos.push({
      id: id,
      name: name,
      publishedAt: publishedAt,
    })
  })
  console.table(infos)
}

async function getFilenames() {
  return await fs.readdir(saveDir)
}
