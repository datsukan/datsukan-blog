import processor from "./utils/processor"

export type Props = {
  text: string
}

export const Markdown = ({ text }: Props) => {
  return processor.processSync(text).result
}
