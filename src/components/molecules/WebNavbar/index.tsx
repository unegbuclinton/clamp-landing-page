import React, { useState, useEffect } from 'react'
import ClampLogo from '../ClampLogo/ClampLogo'
import Link from 'next/link'

interface navbarProps {
  openAboutSection: () => void
  menuRef: React.RefObject<HTMLDivElement>
}
const WebNavBar: React.FC<navbarProps> = ({ openAboutSection, menuRef }) => {
  const [changeButton, setChangeButton] = useState<boolean>(false)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY > 575) {
        setChangeButton(true)
      }
      if (scrollY < 575) {
        setChangeButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className='w-full flex justify-between items-center px-3 lg:px-28 py-3 border-b border-light-grey fixed top-0 bg-white z-10'>
      <ClampLogo />

      <div ref={menuRef} className='flex gap-[30px] items-center'>
        <li
          className='text-sm list-none cursor-pointer'
          onClick={openAboutSection}
        >
          About
        </li>
        <Link className='text-sm' href={''}>
          Contact
        </Link>
        <Link
          href={'https://zcal.co/i/Yrxnhmav'}
          className={`flex justify-center items-center font-semibold ${
            changeButton ? 'bg-black text-white' : 'bg-white text-black'
          } text-sm py-[6px] px-[18px] rounded-lg border border-light-grey cursor-pointer hover:bg-white/85`}
        >
          Start here{' '}
          <p
            className={`py-[2px] px-[6px] rounded ${
              changeButton
                ? 'text-silver bg-white/25'
                : 'text-dim-grey bg-black/10'
            }  ml-2.5`}
          >
            A
          </p>
        </Link>
      </div>
    </nav>
  )
}

export default WebNavBar
