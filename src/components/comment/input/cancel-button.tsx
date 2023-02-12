type Props = {
  label: string
  cancel: Function
  isLoading: boolean
}

export const CancelButton = ({ label, cancel, isLoading }: Props) => {
  return (
    <button
      type="button"
      onClick={() => cancel()}
      className={`group rounded-lg px-3 py-2 hover:bg-gray-200 ${
        isLoading ? "cursor-not-allowed" : ""
      }`}
      disabled={isLoading}
    >
      <span className="text-sm text-gray-400 group-hover:text-gray-600">
        {label}
      </span>
    </button>
  )
}
