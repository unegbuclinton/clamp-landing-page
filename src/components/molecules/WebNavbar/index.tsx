import React from 'react'
import ClampLogo from '../ClampLogo/ClampLogo'
import Link from 'next/link'

const WebNavBar = () => {
  return (
    <nav className='w-full flex justify-between items-center px-28 py-3 border-b border-light-grey fixed top-0 bg-white z-10'>
      <ClampLogo />

      <div className='flex gap-[30px] items-center'>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
        <Link
          href={'https://zcal.co/i/Yrxnhmav'}
          className='flex justify-center items-center font-semibold text-sm py-[5px] px-4 rounded-lg border border-light-grey cursor-pointer hover:bg-white/85'
        >
          Start here{' '}
          <p className='p-[5px] px-[10px] rounded text-dim-grey bg-black/10 ml-2.5'>
            A
          </p>
        </Link>
      </div>
    </nav>
  )
}

export default WebNavBar
