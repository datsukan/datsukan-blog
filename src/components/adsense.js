import React, { useEffect } from "react"

export const Adsense = ({ className, path }) => {
  useEffect(() => {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [path])

  return (
    <ins
      className={`adsbygoogle block w-full ${className}`}
      data-ad-client="ca-pub-4435913134683646"
      data-ad-slot="5844173870"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
