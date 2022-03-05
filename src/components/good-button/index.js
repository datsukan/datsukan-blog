import { useState } from "react"
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

export const GoodButton = ({ className = "" }) => {
  const iconText = "👍"

  const [hasClick, setHasClick] = useState(false)
  const [isStopped, setIsStopped] = useState(true)

  const toggleHasClick = e => {
    if (!hasClick) setIsStopped(false)
    setHasClick(!hasClick)
  }

  const styleClass = hasClick
    ? "bg-yellow-50 hover:bg-yellow-100 ring-1 ring-yellow-100"
    : "bg-primary hover:bg-primary-hover"
  const grayscale = hasClick ? "grayscale-0" : "grayscale"

  return (
    <div className={className}>
      <button
        className={`p-4 rounded-full drop-shadow relative ${styleClass}`}
        onClick={toggleHasClick}
      >
        <StarBurstLottie isStopped={isStopped} setIsStopped={setIsStopped} />
        <Twemoji
          svg
          text={iconText}
          options={{
            className: `!w-8 !h-8 ${grayscale}`,
          }}
        />
      </button>
    </div>
  )
}
