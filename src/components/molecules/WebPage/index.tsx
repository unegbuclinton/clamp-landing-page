import React, { useEffect, useState } from 'react'
import Retain from './Retain'
import ProductThread from './ProductThread'
import HowItWorks from './HowItWorks'
import retainImg from '@/assets/imgs/retain-img.png'
import Demo from '@/assets/svgs/static-demo.svg'
import Overview from '@/assets/svgs/overview.svg'
import CustomerImg from '@/assets/svgs/customer.svg'
import DataFlowImg from '@/assets/svgs/data-flow.svg'
import CampaignInsight from './CampaignInsight'
import CustomerSection from './CustomerSection'
import Integration from './Integration'
import ScheduleDemo from './ScheduleDemo'
import AboutUs from './AboutUs'

const WebPageSections = ({ isVisible }: { isVisible: boolean }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const handleScroll = () => {
    const scrollY = window.scrollY
    const viewportHeight = window.innerHeight

    // Define section start and end points as percentages of viewport height
    const sections = [
      { id: 'section-three', start: 180, end: 250 },
      { id: 'section-four', start: 255, end: 320 },
      { id: 'section-five', start: 350, end: 450 },
      { id: 'section-six', start: 480, end: 550 },
    ]

    const active = sections.find(
      (section) =>
        scrollY >= (section.start / 100) * viewportHeight &&
        scrollY < (section.end / 100) * viewportHeight
    )

    console.log(active)
    if (activeSection === active?.id) return

    setActiveSection(active ? active.id : null)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='flex relative'>
      <div className='md:w-[50%]'>
        <Retain />
        <ProductThread />
        <HowItWorks />
        <CampaignInsight />
        <CustomerSection />
        <Integration />
        <ScheduleDemo />
      </div>
      <div
        className='hidden md:flex justify-center items-center'
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
        <div
          className={`animate-fadeIn ${
            activeSection === 'section-three' ? 'block' : 'opacity-0 hidden'
          }`}
        >
          <Demo />
        </div>

        <div
          className={`animate-fadeInFromBottom ${
            activeSection === 'section-four' ? 'block' : 'opacity-0 hidden'
          }`}
        >
          <Overview />
        </div>

        <div
          className={`animate-fadeInFromBottom ${
            activeSection === 'section-five' ? 'block' : 'opacity-0 hidden'
          }`}
        >
          <CustomerImg />
        </div>
        <div
          className={`animate-fadeInFromBottom ${
            activeSection === 'section-six' ? 'block' : 'opacity-0 hidden'
          }`}
        >
          <DataFlowImg />
        </div>
        <div
          className={`w-[75%] absolute z-10 bg-white top-0 right-0 bottom-0 ${
            isVisible ? 'about-section' : 'about-section__active'
          }`}
        >
          <AboutUs />
        </div>
      </div>
    </div>
  )
}

export default WebPageSections
