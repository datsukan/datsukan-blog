import { Twemoji } from "@components/twemoji"

const sizeClassMap = {
  tiny: "!w-6 !h-6",
  small: "!w-12 !h-12",
  medium: "!w-24 !h-24",
  large: "!w-48 !h-48",
}

export const Emoji = ({ className = "", text, size = "medium" }) => {
  const defaultText = ":hatched_chick:"
  const sizeClass = sizeClassMap[size]

  return (
    <Twemoji
      svg
      text={text ?? defaultText}
      options={{
        className: `${className} ${sizeClass}`,
      }}
    />
  )
}
