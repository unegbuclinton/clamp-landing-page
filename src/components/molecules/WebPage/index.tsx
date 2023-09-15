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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const sections = [
        { id: 'section-three', start: 1159, end: 1702 },
        { id: 'section-four', start: 1711, end: 2279 },
        { id: 'section-five', start: 2318, end: 3185 },
        { id: 'section-six', start: 3361, end: 4100 },
      ]

      const active = sections.find((section) =>
        section.end
          ? scrollY >= section.start && scrollY < section.end
          : scrollY >= section.start
      )

      setActiveSection(active ? active.id : null)
    }

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
