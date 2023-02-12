import axios from "axios"

export type Comment = {
  id: string
  articleId: string
  parentId: string
  userName: string
  content: string
  createdAt: string
}

export type RegisterCommentRequest = {
  articleId: string
  parentId?: string
  userName: string
  content: string
}

export const registerValidate = (
  r: RegisterCommentRequest,
  hasParent: boolean
): boolean => {
  if (r.articleId == "") {
    alert(
      "データの読み込みに失敗しています。\nページを再表示してから再度投稿してください。"
    )
    return false
  }
  if (hasParent && r.parentId == "") {
    alert(
      "データの読み込みに失敗しています。\nページを再表示してから再度投稿してください。"
    )
    return false
  }
  if (r.userName == "") {
    alert("表示名を入力してください。")
    return false
  }
  if (r.content == "") {
    alert("コメントを入力してください。")
    return false
  }

  return true
}

export type RegisterCommentResponse = Comment

export const registerComment = async (
  signal: AbortSignal,
  param: RegisterCommentRequest
): Promise<RegisterCommentResponse | null> => {
  let result = null

  await axios
    .post(
      "https://api.comment.blog.datsukan.me",
      toUnderscoreCaseObject(param),
      { signal: signal }
    )
    .then(res => {
      result = toCamelCaseObject(res.data)
    })
    .catch(err => {
      if (err.response.state === 400) {
        alert("未入力の項目があります。")
        return
      }
      console.log(err.response.data)
      alert(
        "コメントの投稿処理中に問題が発生しました。\n再度実行してください。"
      )
    })

  return result
}

export type RefResponseReply = Comment

export type RefResponseItem = Comment & {
  replyComments: RefResponseReply[]
}

export type RefResponse = RefResponseItem[]

export const refComments = async (
  signal: AbortSignal,
  articleId: string
): Promise<RefResponse | null> => {
  let result = null

  await axios
    .get(`https://api.comment.blog.datsukan.me?article_id=${articleId}`, {
      signal: signal,
    })
    .then(res => {
      const r: RefResponse = []
      if (res.data && res.data.length > 0) {
        for (const item of res.data) {
          const cc = toCamelCaseObject(item) as RefResponseItem
          if (cc.replyComments && cc.replyComments.length > 0) {
            const cr: RefResponseReply[] = []
            for (const ccItem of cc.replyComments) {
              cr.push(toCamelCaseObject(ccItem) as RefResponseReply)
            }
            cc.replyComments = cr
          }
          r.push(cc)
        }
      }
      result = r
    })
    .catch(err => {
      console.log(err.response.data)
      alert(
        "コメントの取得処理中に問題が発生しました。\n再度ページを読み込んでください。"
      )
    })

  return result
}

// スネークケースからキャメルケースに変換（文字列）.
function toCamelCase(str: string): string {
  return str
    .split("_")
    .map(function (word, index) {
      if (index === 0) {
        return word.toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join("")
}

// スネークケースからキャメルケースに変換（オブジェクト）.
function toCamelCaseObject(obj: Object): Object {
  interface IObject {
    [key: string]: Object
  }
  const result: IObject = {}
  Object.keys(obj).forEach(key => {
    result[toCamelCase(key)] = (obj as IObject)[key]
  })
  return result
}

// キャメルケースからスネークケースに変換（文字列）.
function toUnderscoreCase(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase()
}

// キャメルケースからスネークケースに変換（オブジェクト）.
function toUnderscoreCaseObject(obj: Object): Object {
  interface IObject {
    [key: string]: Object
  }
  const result: IObject = {}
  Object.keys(obj).forEach(key => {
    result[toUnderscoreCase(key)] = (obj as IObject)[key]
  })
  return result
}
