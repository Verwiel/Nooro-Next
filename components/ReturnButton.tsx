'use client'

import Image from "next/image"
import Link from "next/link"

const ReturnButton = () => {
  return (
    <Link href="/">
      <Image
        src="/static/arrow-left.svg"
        width={24}
        height={24}
        alt="Return"
        className="mt-16"
      />
    </Link>
  )
}

export default ReturnButton
