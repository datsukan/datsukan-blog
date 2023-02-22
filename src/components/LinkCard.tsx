type Props = {
  label: string
  image: string
  linkUrl: string
}

export const LinkCard = ({ label, image, linkUrl }: Props) => {
  return (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer">
      <div className="flex flex-col items-center">
        <img src={image} alt={label} className="h-14 w-14" />
        <span className="mt-2 text-xs font-semibold text-secondary">
          {label}
        </span>
      </div>
    </a>
  )
}
