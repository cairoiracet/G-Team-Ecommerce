import React from 'react'
import { Title } from './ui/text'
import Link from 'next/link'
import Image from 'next/image'
import Banner from '@/images/banner/Banner.png'

const HomeBanner = () => {
  return (
    <div className='py-16 md:py-0 bg-[#f2f3f4] rounded-lg px-10 lg:px-24 flex items-center justify-between'>
        <div className='space-y-5'>
            <Title>Garanta até 20% de desconto<br/>Em camisas</Title>
            <Link href={"/shop"} className="bg-red-600/90 text-white px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-redColor hoverEffect ">Compre Agora</Link>
        </div>
        <div>
            <Image src={Banner} alt="banner" className="hidden md:inline-flex w-96" />
        </div>
    </div>
  )
}

export default HomeBanner