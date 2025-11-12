import { Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const FavoriteButton = () => {
  return (
      <Link href={"/favourite"} className="group relative">
      <Heart className="w-5 h-5 hover:text-red-700 hoverEffect"/>
      <span className="absolute -top-1 -right-1 bg-red-700 text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">0</span>
    </Link>
  )
}

export default FavoriteButton