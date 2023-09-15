import { diagrams } from '@/utilities/data/websiteData'
import React from 'react'

const ProductThread = () => {
  return (
    <div className='section px-6 md:px-4 flex flex-wrap border-r border-light-grey/90'>
      {diagrams?.map(({ header, img, text, borderStyle }, idx) => (
        <div
          key={idx}
          className={`w-full md:w-1/2 flex px-6 md:px-0 py-4 md:py-0 justify-start md:justify-center border-light-grey/90 lg:${borderStyle} `}
        >
          <div className='flex flex-col items-center justify-center'>
            <span style={{ alignSelf: 'flex-start' }}>{img}</span>
            <div className='mt-4'>
              <p className='text-base'> {header}</p>
              <p className='text-dim-grey text-[13px] max-w-[240px]'>{text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductThread
