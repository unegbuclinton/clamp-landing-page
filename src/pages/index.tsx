'use client'
import ButtonComponent from '@/components/atoms/button'
import GetAccessModalComponent from '@/components/molecules/GetAccess'
import Modal from '@/components/molecules/Modal'
import Footer from '@/components/molecules/Footer'
import { heroImg } from '@/utilities/data/heroImg'
import { useState } from 'react'
import LandingNavbar from '@/components/molecules/LandingPageNav'
import Image from 'next/image'
import retain from '@/assets/imgs/retain-customers.jpg'
import check from '@/assets/imgs/check.png'
import demo from '@/assets/imgs/demo.jpg'
import WebNavBar from '@/components/molecules/WebNavbar'
import WebPageSections from '@/components/molecules/WebPage'

export default function Home() {
  const [accessModal, setAccessModal] = useState<boolean>(false)
  const [thankYouModal, setThankYouModal] = useState<boolean>(false)

  const handleThankYouModal = () => {
    setThankYouModal(true)
    setTimeout(() => {
      setThankYouModal(false)
    }, 3000)
  }

  return (
    <div>
      <WebNavBar />
      <WebPageSections />
    </div>
  )
}
