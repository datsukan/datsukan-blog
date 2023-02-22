import { AdsenseBase } from "@components/adsense/Base"

type Props = {
  className?: string
  path: string
}

export const AdsenseLandscape = (props: Props) => {
  return <AdsenseBase {...props} adSlot="3057410196" />
}
