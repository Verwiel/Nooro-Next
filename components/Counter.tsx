
const Counter = ({ value, total, isCompletedList }: { 
  value: number, 
  total: number, 
  isCompletedList: boolean 
}) => {
  const display = isCompletedList ? `${value} of ${total}` : value

  return (
    <div className="bg-[#333333] ml-2 px-[8px] py-[2px] rounded-full">
      <p className="text-xs text-[#D9D9D9] font-bold p-1">{display}</p>
    </div>
  )
}

export default Counter
