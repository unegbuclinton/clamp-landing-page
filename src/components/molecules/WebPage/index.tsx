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
import SectionSix from './SectionSix'
import ScheduleDemo from './ScheduleDemo'
import AboutUs from './AboutUs'

const WebPageSections = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const sections = [
        { id: 'section-three', start: 1315, end: 2078 },
        { id: 'section-four', start: 2178, end: 2948 },
        { id: 'section-five', start: 2949, end: 3400 },
        { id: 'section-six', start: 3849, end: 4152 },
        { id: 'section-seven', start: 3849, end: 4152 },
      ]
      console.log(scrollY)

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
    <div className='flex'>
      <div className='w-[50%]'>
        <Retain />
        <ProductThread />
        <HowItWorks />
        <CampaignInsight />
        <CustomerSection />
        <SectionSix />
        <ScheduleDemo />
        <AboutUs />
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
      </div>
    </div>
  )
}

export default WebPageSections
