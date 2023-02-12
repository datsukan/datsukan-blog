type Props = {
  name: string
  setName: Function
}

export const Name = ({ name, setName }: Props) => {
  return (
    <div className="flex flex-col">
      <label className="text-xs text-gray-500" htmlFor="name">
        表示名
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        className="box-border h-10 w-full border-b outline-none focus:border-b-2 focus:border-blue-500 md:w-1/2"
      />
    </div>
  )
}
