import React from 'react'
import Cancel from '@/assets/svgs/cancel.svg'

const AboutUs = ({ onCancel }: { onCancel: () => void }) => {
  const links = [
    { text: 'Contact', url: '' },
    // { text: 'Twitter', url: '' },
    { text: 'Linkedin', url: 'https://www.linkedin.com/company/clamployalty/' },
    {
      text: 'Clamp Growth Podcast',
      url: 'https://podcasters.spotify.com/pod/show/obinna-unegbu4/episodes/Clamp-Growth-with-Usman-Amusat-e28r6i1',
    },
  ]
  return (
    <div className='section flex flex-col justify-center lg:pl-[112px] px-6 md:px-4 border-r border-light-grey/90'>
      <div onClick={onCancel} className='flex justify-end px-5'>
        <Cancel />
      </div>
      <h2 className='text-[32px] mb-6'>
        <span className='font-bold'>ABOUT</span> US
      </h2>
      <p className='text-dim-grey text-2xl lg:text-lg max-w-[500px] mb-8'>
        At <span className='font-bold'>clamp</span>, our mission is simple yet
        profound: We care deeply about customers and are dedicated to building
        lasting relationships with your business and customers. We don&apos;t
        just want customers; we want to create for you loyal fans and advocates
        who genuinely love your products and services.
      </p>
      <ul className='flex flex-col'>
        {links.map(({ text, url }, idx) => (
          <a
            href={url}
            key={idx}
            className='underline cursor-pointer mb-6 text-base'
          >
            {text}
          </a>
        ))}
      </ul>
    </div>
  )
}

export default AboutUs
