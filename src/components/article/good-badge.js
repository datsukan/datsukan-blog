import React, { useState, useEffect } from "react"
import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"

export const GoodBadge = ({ className = "", articleID }) => {
  const [goodCount, setGoodCount] = useState(null)

  useEffect(() => {
    fetchGoodCount(articleID, setGoodCount)
  }, [])

  return (
    <div
      className={`flex items-center gap-2 text-xs text-secondary ${className}`}
    >
      <FontAwesomeIcon
        icon={faThumbsUp}
        width={12}
        height={12}
        className="inline-block h-3 w-3"
      />
      <div className="mt-0.5">{goodCount}</div>
    </div>
  )
}

const baseEndpoint = "https://api.good.blog.datsukan.me"
const fetchErrorMessage =
  "データの取得でエラーが発生しました。正常な表示にする場合はページをリロードしてください。"

async function fetchGoodCount(articleID, setGoodCount) {
  const goodCount = await getGoodCount(articleID)
  setGoodCount(goodCount)
}

async function getGoodCount(articleID) {
  let goodCount

  await axios
    .get(`${baseEndpoint}/${articleID}`)
    .then(res => {
      goodCount = res.data.goodCount
    })
    .catch(err => {
      goodCount = 0
      console.log(fetchErrorMessage)
    })

  return goodCount
}
