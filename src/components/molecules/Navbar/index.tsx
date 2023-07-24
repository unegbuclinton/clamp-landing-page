import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import Link from 'next/link'
import { menu } from '@/utilities/data/sidebarItems'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const toggleMenu = () => {
    setOpen(!open)
  }
  const closeMenu = () => setOpen(false)
  const showMenuBar = '-translate-x-[70%] duration-200'
  const hideMenueBar = '-translate-x-[200%] duration-200'
  return (
    <div className='w-full py-1'>
      <nav className=' border-gray-200 px-2 '>
        <div className='flex flex-wrap items-center justify-between'>
          <a href='#' className='font-semibold p-2 lg:ml-4 text-xl'>
            Clamp
          </a>
          <div className='flex md:order-2'>
            <div className='flex gap-2 items-center cursor-pointer'>
              <FaUserCircle size={28} />
            </div>
            <div className='mt-1 lg:hidden ml-3' onClick={toggleMenu}>
              {open ? (
                <AiOutlineClose color='#000' size={20} />
              ) : (
                <AiOutlineMenu color='#000' size={20} />
              )}
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`${
          open ? showMenuBar : hideMenueBar
        } flex fixed h-screen w-[60%] top-0 right-0 bg-black z-[10] lg:hidden `}
      >
        <div className='w-full flex flex-col justify-center items-center'>
          {menu?.map(({ title, to }, idx) => {
            return (
              <Link
                key={idx}
                href={to}
                onClick={closeMenu}
                className='text-center mb-5'
              >
                <p className='text-white -text-sm'>{`0${idx + 1}.`}</p>
                <p className='text-white'>{title}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Navbar
