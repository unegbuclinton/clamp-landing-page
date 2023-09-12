import React from 'react'

const SectionEight = () => {
  const links = [
    { text: 'Contact', url: '' },
    { text: 'Twitter', url: '' },
    { text: 'Clamp Growth Podcast', url: '' },
  ]
  return (
    <div className='section flex flex-col justify-center pl-[112px] border-r border-light-grey/90'>
      <h2 className='text-[32px] mb-6'>
        <span className='font-bold'>ABOUT</span> US
      </h2>
      <p className='mb-12 max-w-[560px] text-2xl'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, quas
        ipsam! Perspiciatis veniam omnis nemo suscipit! Nobis nulla dolor eum
        praesentium mollitia dolore unde provident corporis fuga reiciendis,
        adipisci magni, dignissimos distinctio rem voluptatem sed ab eveniet
        optio fugit corrupti hic assumenda! Aliquam amet consequatur natus
        veniam nam fugiat pariatur!
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

export default SectionEight
