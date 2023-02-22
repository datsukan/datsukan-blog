import { DisplayToggle } from "@components/comment/Input/DisplayToggle"

type Props = {
  showPreview: boolean
  setShowPreview: Function
}

export const Toolbar = ({ showPreview, setShowPreview }: Props) => {
  return (
    <div className="flex flex-col justify-between gap-3 md:flex-row">
      <DisplayToggle
        showPreview={showPreview}
        setShowPreview={setShowPreview}
      />
      <div>
        <a
          href="/datsukan-blog-markdown-preview"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-sm underline hover:text-blue-500"
          tabIndex={-1}
        >
          Markdown記法について↗︎
        </a>
      </div>
    </div>
  )
}
