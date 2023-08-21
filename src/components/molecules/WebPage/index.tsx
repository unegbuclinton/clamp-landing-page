import React, { useEffect, useState } from 'react'
import SectionOne from './SectionOne'
import SectionTwo from './SectionTwo'
import SectionThree from './SectionThree'
import retainImg from '@/assets/imgs/retain-img.png'
import Demo from '@/assets/svgs/static-demo.svg'
import Overview from '@/assets/svgs/overview.svg'
import SectionFour from './SectionFour'

const WebPageSections = () => {
  const [showSectionThreeInfo, setShowSectionThreeInfo] =
    useState<boolean>(false)
  const [showSectionFourInfo, setShowSectionFourInfo] = useState<boolean>(false)

  const changeRightContent = () => {
    const scrollY = window.scrollY

    if (scrollY >= 1315 && scrollY < 2078) {
      setShowSectionThreeInfo(true)
      setShowSectionFourInfo(false)
    } else if (scrollY >= 2178) {
      setShowSectionThreeInfo(false)
      setShowSectionFourInfo(true)
    } else {
      setShowSectionThreeInfo(false)
      setShowSectionFourInfo(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeRightContent)
    return () => window.removeEventListener('scroll', changeRightContent)
  })

  return (
    <div className='flex'>
      <div className='w-[50%]'>
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
      </div>
      <div
        className='flex justify-center items-center'
        style={{
          backgroundImage: `url(${retainImg.src})`,
          backgroundRepeat: 'no-repeat',
          position: 'fixed',
          backgroundSize: '100% 100%',
          top: 0,
          right: 0,
          bottom: 0,
          width: '50%',
        }}
      >
        {/* section three */}
        <div
          className={`${
            showSectionThreeInfo ? 'animate-fadeIn block' : 'opacity-0 hidden'
          }`}
        >
          <Demo />
        </div>

        {/* section four */}
        <div
          className={`${
            showSectionFourInfo
              ? 'animate-fadeInFromBottom block'
              : 'opacity-0 hidden'
          }`}
        >
          <Overview />
        </div>
      </div>
    </div>
  )
}

export default WebPageSections
