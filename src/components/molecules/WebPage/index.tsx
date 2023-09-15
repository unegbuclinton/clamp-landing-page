import React, { useEffect, useRef, useState } from 'react'
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

const WebPageSections = ({
  isVisible,
  onCancel,
}: {
  isVisible: boolean
  onCancel: () => void
}) => {
  const [activeSection, setActiveSection] = useState<{
    id: string
    intersect: boolean
  } | null>(null)

  const sectionRefs = {
    Retain: useRef<HTMLDivElement>(null),
    ProductThread: useRef<HTMLDivElement>(null),
    HowItWorks: useRef<HTMLDivElement>(null),
    CampaignInsight: useRef<HTMLDivElement>(null),
    CustomerSection: useRef<HTMLDivElement>(null),
    Integration: useRef<HTMLDivElement>(null),
    Demo: useRef<HTMLDivElement>(null),
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection({
            id: entry.target.id,
            intersect: entry.isIntersecting,
          })
        }
      })
    }, options)

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className='flex relative'>
      <div className='md:w-[50%]'>
        <Retain ref={sectionRefs.Retain} />
        <ProductThread ref={sectionRefs.ProductThread} />
        <HowItWorks ref={sectionRefs.HowItWorks} />
        <CampaignInsight ref={sectionRefs.CampaignInsight} />
        <CustomerSection ref={sectionRefs.CustomerSection} />
        <Integration ref={sectionRefs.Integration} />
        <ScheduleDemo ref={sectionRefs.Demo} />
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
            activeSection?.intersect && activeSection.id === 'HowItWorks'
              ? 'block'
              : 'opacity-0 hidden'
          }`}
        >
          <Demo />
        </div>

        <div
          className={`animate-fadeInFromBottom ${
            activeSection?.intersect && activeSection.id === 'CampaignInsight'
              ? 'block'
              : 'opacity-0 hidden'
          }`}
        >
          <Overview />
        </div>

        <div
          className={`animate-fadeInFromBottom ${
            activeSection?.intersect && activeSection.id === 'CustomerSection'
              ? 'block'
              : 'opacity-0 hidden'
          }`}
        >
          <CustomerImg />
        </div>
        <div
          className={`animate-fadeInFromBottom ${
            activeSection?.intersect && activeSection.id === 'Integration'
              ? 'block'
              : 'opacity-0 hidden'
          }`}
        >
          <DataFlowImg />
        </div>
      </div>
      <div
        className={`w-full md:w-[50%] fixed z-10 bg-white top-0 right-0 bottom-0 transition-transform duration-500 ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <AboutUs onCancel={onCancel} />
      </div>
    </div>
  )
}

export default WebPageSections
