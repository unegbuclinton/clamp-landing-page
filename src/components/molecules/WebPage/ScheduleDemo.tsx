import DemoIcon from '@/assets/svgs/demoIcon.svg'
import React, { forwardRef } from 'react'
import Link from 'next/link'

const ScheduleDemo = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const links = [
    { text: 'Linkedin', url: 'https://www.linkedin.com/company/clamployalty/' },
    {
      text: 'Clamp Growth Podcast',
      url: 'https://podcasters.spotify.com/pod/show/obinna-unegbu4/episodes/Clamp-Growth-with-Usman-Amusat-e28r6i1',
    },
  ]
  return (
    <div
      ref={ref}
      id='Demo'
      className='section relative flex flex-col justify-center lg:pl-[112px] px-6 md:px-4 pb-28 md:pb-0 border-r border-light-grey/90'
    >
      <h2 className='text-[32px] mb-6'>
        <span className='font-bold'>Let&apos;s talk</span>
      </h2>

      <p className='text-2xl text-dim-grey max-w-[500px] lg:text-lg mb-7'>
        Take a decisive step towards keeping your customers engaged, fostering
        loyalty, and revenue growth.
      </p>
      <Link
        href='https://zcal.co/i/Yrxnhmav'
        className='flex w-fit text-white justify-center items-center py-[6px] px-[18px] rounded-lg bg-black cursor-pointer hover:bg-black/95'
      >
        <p className='flex items-center gap-[11px] text-2xl lg:text-[17px]'>
          Request demo
          <span>
            <DemoIcon />
          </span>
        </p>
      </Link>

      <ul className='absolute bottom-10 flex gap-5'>
        {links.map(({ text, url }, idx) => (
          <a
            href={url}
            key={idx}
            className='underline cursor-pointer mb-6 text-base'
          >
            {text}
          </a>
        ))}
      </ul>
    </div>
  )
})

ScheduleDemo.displayName = 'ScheduleDemo'
export default ScheduleDemo
