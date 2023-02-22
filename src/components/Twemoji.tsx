import { ComponentProps } from "react"
import { Twemoji as BaseTwemoji } from "react-emoji-render"

export type Props = ComponentProps<typeof BaseTwemoji>

const protocol = "https"
const baseUrl = "//cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/"

export const Twemoji = (props: Props) => {
  if (props.options) {
    props.options.protocol = protocol
    props.options.baseUrl = baseUrl
  } else {
    props.options = {
      protocol: protocol,
      baseUrl: baseUrl,
    }
  }

  return <BaseTwemoji {...props} />
}
