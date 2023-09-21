import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

const Loading: React.FC<{className?: string}> = ({className = ''}) => {
  return (
    <div className={twMerge("flex items-center justify-center w-full text-black", className)}>
      <span className="flex items-center justify-center gap-2">
        <AiOutlineLoading3Quarters className="inline animate-spin" />
      </span>
    </div>
  )
}

export default Loading