import React, { forwardRef } from 'react'
import Link from 'next/link'

const Retain = forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <div
      ref={ref}
      id='Retain'
      className='section lg:pl-[112px] px-6 md:px-4 flex flex-col justify-center gap-10 border-r border-light-grey/90'
    >
      <h1 className='w-[150px] text-[32px]'>
        <span className='font-bold'>RETAIN</span> YOUR <br /> CUSTOMERS
      </h1>
      <div className='text-dim-grey text-2xl lg:text-lg max-w-[470px]'>
        Increase your customers loyalty & retention by using Clamp&apos;s API -
        driven incentivization software, design personalized offers for
        gamification, referral and repeat sales
      </div>

      <div className='text-2xl lg:text-sm mt-5 lg:mt-20'>
        <a
          href='https://zcal.co/i/Yrxnhmav'
          className='flex w-fit text-white justify-center items-center py-[6px] px-[18px] rounded-lg bg-black cursor-pointer hover:bg-black/95'
        >
          Start here{' '}
          <p className='py-[2px] px-[6px] rounded text-silver bg-white/25 ml-2.5'>
            A
          </p>
        </a>
        <p className='text-battle-grey mt-5 cursor-pointer'>
          Got an account?{' '}
          <span className='text-black font-bold'>
            <Link href='/signin'>Login</Link>
          </span>
        </p>
      </div>
    </div>
  )
})
Retain.displayName = 'Retain'
export default Retain
