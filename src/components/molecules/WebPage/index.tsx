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

const WebPageSections = ({ isVisible }: { isVisible: boolean }) => {
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
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0.5, // Trigger when at least 50% of the section is visible
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

    // Observe each section
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    // Cleanup the observer when the component unmounts
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
