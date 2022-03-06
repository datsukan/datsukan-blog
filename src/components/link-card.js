export const LinkCard = ({ label, image, linkUrl }) => {
  return (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer">
      <div className="flex flex-col items-center">
        <img src={image} alt={label} className="w-14 h-14" />
        <span className="text-xs text-secondary font-semibold">{label}</span>
      </div>
    </a>
  )
}
