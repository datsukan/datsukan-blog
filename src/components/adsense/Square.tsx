import { AdsenseBase } from "@components/adsense/Base"

type Props = {
  className?: string
  path: string
}

export const AdsenseSquare = (props: Props) => {
  return <AdsenseBase {...props} adSlot="5844173870" />
}
