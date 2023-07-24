import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-16 text-black">
      <span className="flex items-center justify-center gap-2">
        <AiOutlineLoading3Quarters className="inline animate-spin" />
      </span>
    </div>
  )
}

export default Loading