import React, { useEffect } from "react"

type Props = {
  className?: string
  path: string
  adSlot: string
}

export const AdsenseBase = ({ className, path, adSlot }: Props) => {
  useEffect(() => {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [path])

  return (
    <ins
      className={`adsbygoogle block w-full ${className}`}
      data-ad-client="ca-pub-4435913134683646"
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
