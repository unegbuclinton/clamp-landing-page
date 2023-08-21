import React from 'react'
import Logo from '@/assets/svgs/website-logo.svg'
import Clamp from '@/assets/svgs/Clamp.svg'

const WebNavBar = () => {
  return (
    <nav className='w-full flex justify-between items-center px-28 py-3 border-b border-light-grey fixed top-0 bg-white z-10'>
      <div className='flex gap-[13px]'>
        <Logo />
        <Clamp />
      </div>

      <div className='flex justify-center items-center font-semibold text-sm py-[5px] px-4 rounded-lg border border-light-grey cursor-pointer'>
        Start here{' '}
        <p className='p-[5px] px-[10px] rounded text-dim-grey bg-black/10 ml-2.5'>
          A
        </p>
      </div>
    </nav>
  )
}

export default WebNavBar
