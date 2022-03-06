import React, { useState, useEffect } from "react"
import axios from "axios"

import { Twemoji } from "react-emoji-render"
import Lottie from "react-lottie"
import animationData from "@components/good-button/star-burst-animation.json"

const StarBurstLottie = ({ className, isStopped, setIsStopped }) => {
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  const style = {
    position: "absolute",
    top: -18,
    left: -18,
  }

  return (
    <Lottie
      isStopped={isStopped}
      isClickToPauseDisabled={true}
      options={defaultOptions}
      width={96}
      height={96}
      style={style}
      className={className}
      eventListeners={[
        {
          eventName: "complete",
          callback: () => setIsStopped(true),
        },
      ]}
    />
  )
}

export const GoodButton = ({ className = "", articleID }) => {
  if (!articleID) return null

  const iconText = "👍"

  const [isLoading, setIsLoading] = useState(false)
  const [hasClick, setHasClick] = useState(false)
  const [isStopped, setIsStopped] = useState(true)
  const [goodCount, setGoodCount] = useState(null)

  const toggleHasClick = e => {
    setIsLoading(true)

    const completedAction = () => {
      setIsLoading(false)
      setHasClick(!hasClick)
    }

    if (!hasClick) {
      // 未いいね → いいね の場合
      incrementGoodCount(articleID, setGoodCount, setIsStopped, completedAction)
    } else {
      // いいね → 未いいね の場合
      decrementGoodCount(articleID, setGoodCount, completedAction)
    }
  }

  const buttonStyleClass = hasClick
    ? "bg-yellow-50 hover:bg-yellow-100 ring-1 ring-yellow-100"
    : "bg-primary hover:bg-primary-hover"
  const grayscaleClass = hasClick ? "grayscale-0" : "grayscale"
  const loadingStyleClass = hasClick ? "border-yellow-400" : "border-tertiary"

  useEffect(() => {
    fetchGoodCount(articleID, setGoodCount)
  })

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <button
        className={`p-4 rounded-full drop-shadow relative ${buttonStyleClass}`}
        onClick={toggleHasClick}
        disabled={isLoading}
      >
        <StarBurstLottie isStopped={isStopped} setIsStopped={setIsStopped} />
        <Twemoji
          svg
          text={iconText}
          options={{
            className: `!w-8 !h-8 !m-0 ${grayscaleClass}`,
          }}
        />
        <div
          className={`absolute top-0 left-0 h-16 w-16 animate-spin border-2 ${loadingStyleClass} rounded-full border-t-transparent`}
          hidden={!isLoading}
        ></div>
      </button>
      <span className="mt-1 text-secondary text-xs">
        {goodCount ?? "\u00A0"}
      </span>
    </div>
  )
}

const baseEndpoint =
  "https://x9i2a8msme.execute-api.ap-northeast-1.amazonaws.com/v1"
const fetchErrorMessage =
  "データの取得でエラーが発生しました。正常な表示にする場合はページをリロードしてください。"
const updateErrorMessage =
  "データの更新でエラーが発生しました。ページをリロードしてから再度実行してください。"

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

function incrementGoodCount(
  articleID,
  setGoodCount,
  setIsStopped,
  completedAction
) {
  axios
    .post(`${baseEndpoint}/${articleID}/increment`)
    .then(res => {
      const goodCount = res.data.goodCount
      setGoodCount(goodCount)
      setIsStopped(false)
      completedAction()
    })
    .catch(err => {
      completedAction()
      alert(updateErrorMessage)
    })
}

async function decrementGoodCount(articleID, setGoodCount, completedAction) {
  axios
    .post(`${baseEndpoint}/${articleID}/decrement`)
    .then(res => {
      const goodCount = res.data.goodCount
      setGoodCount(goodCount)
      completedAction()
    })
    .catch(err => {
      completedAction()
      alert(updateErrorMessage)
    })
}
