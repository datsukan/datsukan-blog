import React, { useState, useEffect } from "react"
import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment } from "@fortawesome/free-solid-svg-icons"

type Props = {
  articleId: string
}

export const CommentBadge = ({ articleId }: Props) => {
  const [count, setCount] = useState(null)

  useEffect(() => {
    fetchCount(articleId, setCount)
  }, [])

  return (
    <div className="flex items-center gap-2 text-xs text-secondary">
      <FontAwesomeIcon icon={faComment} className="inline-block h-3 w-3" />
      <div className="mt-0.5 w-2">{count}</div>
    </div>
  )
}

const baseEndpoint = "https://api.comment.blog.datsukan.me"
const fetchErrorMessage =
  "データの取得でエラーが発生しました。正常な表示にする場合はページをリロードしてください。"

async function fetchCount(articleId: string, setCount: Function) {
  const count = await getCount(articleId)
  setCount(count)
}

async function getCount(articleId: string) {
  let count

  await axios
    .get(`${baseEndpoint}/count?article_id=${articleId}`)
    .then(res => {
      count = res.data.count
    })
    .catch(err => {
      count = 0
      console.log(fetchErrorMessage)
      console.log(err.response.data)
    })

  return count
}
