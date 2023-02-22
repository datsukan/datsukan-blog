import React, { useState, useEffect } from "react"
import type { CSSProperties, MouseEvent } from "react"
import axios from "axios"

import { Twemoji } from "@components/Twemoji"
import Lottie from "react-lottie"
import type { Options as LottieOptions } from "react-lottie"
import animationData from "@components/good-button/star-burst-animation.json"

type Props = {
  className?: string
  isStopped: boolean
  setIsStopped: Function
}

const StarBurstLottie = ({
  className = "",
  isStopped,
  setIsStopped,
}: Props) => {
  const options: LottieOptions = {
    loop: false,
    autoplay: false,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      className: className,
    },
  }

  const style: CSSProperties = {
    position: "absolute",
    top: -18,
    left: -18,
  }

  return (
    <Lottie
      isStopped={isStopped}
      isClickToPauseDisabled={true}
      options={options}
      width={96}
      height={96}
      style={style}
      eventListeners={[
        {
          eventName: "complete",
          callback: () => setIsStopped(true),
        },
      ]}
    />
  )
}

type GoodButtonProps = {
  className?: string
  articleID: string
}

export const GoodButton = ({ className = "", articleID }: GoodButtonProps) => {
  if (!articleID) return null

  const iconText = "👍"

  const [isLoading, setIsLoading] = useState(false)
  const [hasClick, setHasClick] = useState(false)
  const [isStopped, setIsStopped] = useState(true)
  const [goodCount, setGoodCount] = useState<number | null>(null)

  const toggleHasClick = (_: MouseEvent<HTMLInputElement>) => {
    setIsLoading(true)

    const completedAction = () => {
      setIsLoading(false)
      setHasClick(!hasClick)
    }

    if (!hasClick) {
      // 未いいね → いいね の場合
      incrementGoodCount(
        articleID,
        goodCount,
        setGoodCount,
        setIsStopped,
        completedAction
      )
    } else {
      // いいね → 未いいね の場合
      decrementGoodCount(articleID, goodCount, setGoodCount, completedAction)
    }
  }

  const buttonStyleClass = hasClick
    ? "bg-yellow-50 hover:bg-yellow-100 ring-1 ring-yellow-100"
    : "bg-primary hover:bg-primary-hover"
  const grayscaleClass = hasClick ? "grayscale-0" : "grayscale"
  const loadingStyleClass = hasClick ? "border-yellow-400" : "border-tertiary"

  useEffect(() => {
    fetchGoodCount(articleID, setGoodCount)
    if (hasGoodHistory(articleID)) {
      setHasClick(true)
    }
  }, [])

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <button
        className={`relative rounded-full p-4 drop-shadow ${buttonStyleClass}`}
        onClick={() => toggleHasClick}
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
      <span className="mt-1 text-xs text-secondary">
        {goodCount ?? "\u00A0"}
      </span>
    </div>
  )
}

const baseEndpoint = "https://api.good.blog.datsukan.me"
const fetchErrorMessage =
  "データの取得でエラーが発生しました。正常な表示にする場合はページをリロードしてください。"
const updateErrorMessage =
  "データの更新でエラーが発生しました。ページをリロードしてから再度実行してください。"

async function fetchGoodCount(articleID: string, setGoodCount: Function) {
  const goodCount = await getGoodCount(articleID)
  setGoodCount(goodCount)
}

async function getGoodCount(articleID: string) {
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
  articleID: string,
  nowGoodCount: number | null,
  setGoodCount: Function,
  setIsStopped: Function,
  completedAction: Function
) {
  axios
    .put(`${baseEndpoint}/${articleID}/increment`)
    .then(res => {
      const goodCount = res.data.goodCount
      setGoodCount(goodCount)
    })
    .catch(err => {
      alert(updateErrorMessage)
    })
  setGoodCount(nowGoodCount ? nowGoodCount + 1 : 1)
  addGoodHistory(articleID)
  setIsStopped(false)
  completedAction()
}

async function decrementGoodCount(
  articleID: string,
  nowGoodCount: number | null,
  setGoodCount: Function,
  completedAction: Function
) {
  axios
    .put(`${baseEndpoint}/${articleID}/decrement`)
    .then(res => {
      const goodCount = res.data.goodCount
      setGoodCount(goodCount)
    })
    .catch(err => {
      alert(updateErrorMessage)
    })
  setGoodCount(!nowGoodCount || nowGoodCount === 0 ? 0 : nowGoodCount - 1)
  cancelGoodHistory(articleID)
  completedAction()
}

function getHasGoodHistory() {
  const storageData = localStorage.getItem("hasGoodList")
  const hasGoodList = storageData ? JSON.parse(storageData) : {}
  return hasGoodList
}

function hasGoodHistory(articleID: string) {
  const hasGoodList = getHasGoodHistory()
  const hasGood = hasGoodList[articleID] ?? false
  return hasGood
}

function setGoodHistory(articleID: string, hasGood: boolean) {
  const hasGoodList = getHasGoodHistory()
  hasGoodList[articleID] = hasGood
  const storageData = JSON.stringify(hasGoodList)
  localStorage.setItem("hasGoodList", storageData)
}

function addGoodHistory(articleID: string) {
  setGoodHistory(articleID, true)
}

function cancelGoodHistory(articleID: string) {
  setGoodHistory(articleID, false)
}
