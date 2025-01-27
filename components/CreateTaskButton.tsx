'use client'

import Image from "next/image"
import Link from "next/link"

const CreateTaskButton = () => {
  return (
    <Link href="/create" className="flex items-center justify-center w-full -mt-7 text-[#F2F2F2] font-bold bg-[#1E6F9F] rounded-lg p-4 text-sm">
      Create Task
      <Image
        src="/static/plus.svg"
        width={16}
        height={16}
        alt="Plus"
        className="ml-2"
      />
    </Link>
  )
}

export default CreateTaskButton
