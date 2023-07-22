import { getFirstLetter } from '@/utilities/helperFunctions'
import React from 'react'

const NameLogo = ({ name }: { name: string }) => {
  const label = getFirstLetter(name)

  return (
    <span className='flex justify-center items-center text-xl bg-mikando-yellow p-2 rounded-full h-[40px] w-[40px]'>
      {label && label.toLocaleUpperCase()}
    </span>
  )
}

export default NameLogo
