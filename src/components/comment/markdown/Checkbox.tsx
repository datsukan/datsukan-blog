import { useState } from "react"

export type Props = {
  type: string
  checked: boolean
}

export const Checkbox = ({ type, checked }: Props) => {
  const [isChecked, setIsChecked] = useState(checked)
  if (type !== "checkbox") return

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={() => setIsChecked(checked)}
    />
  )
}
