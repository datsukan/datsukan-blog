type Props = {
  showPreview: boolean
  setShowPreview: Function
}

export const DisplayToggle = ({ showPreview, setShowPreview }: Props) => {
  return (
    <div className="flex gap-4">
      <ToggleButton
        label="Markdown"
        active={!showPreview}
        onClick={() => setShowPreview(false)}
      />
      <ToggleButton
        label="Preview"
        active={showPreview}
        onClick={() => setShowPreview(true)}
      />
    </div>
  )
}

type ToggleButtonProps = {
  label: string
  active: boolean
  onClick: Function
}

const ToggleButton = ({ label, active, onClick }: ToggleButtonProps) => {
  return (
    <button
      className={(active ? "rounded-xl bg-blue-100" : "") + " py-1 px-3"}
      onClick={() => onClick()}
      tabIndex={-1}
    >
      <span
        className={
          (active ? "text-blue-600" : "hover:text-blue-600") +
          " text-sm font-bold"
        }
      >
        {label}
      </span>
    </button>
  )
}
