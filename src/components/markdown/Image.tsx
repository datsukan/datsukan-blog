import { useState } from "react"

import { ImageModal } from "@components/markdown/ImageModal"

export type Props = {
  src: string
  alt: string
  title?: string
}

export const Image = (props: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ImageModal open={open} setOpen={setOpen} image={props} />
      <img
        {...props}
        onClick={() => setOpen(true)}
        className="cursor-zoom-in"
      />
    </>
  )
}
