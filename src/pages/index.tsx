'use client'
import { useState, useEffect, useRef } from 'react'
import WebNavBar from '@/components/molecules/WebNavbar'
import WebPageSections from '@/components/molecules/WebPage'

export default function Home() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        aboutRef.current &&
        !aboutRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <div>
      <WebNavBar
        menuRef={aboutRef}
        openAboutSection={() => setIsVisible((prev) => !prev)}
      />
      <WebPageSections
        onCancel={() => setIsVisible(false)}
        isVisible={isVisible}
      />
    </div>
  )
}
