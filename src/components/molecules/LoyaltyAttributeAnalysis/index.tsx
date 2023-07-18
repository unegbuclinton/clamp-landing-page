import AreaChart from '@/components/AreaChart'
import React from 'react'
import ArrowUp from '@/assets/svgs/arrow-up.svg'

const LoyaltyAttribute = () => {
  return (
    <div className='w-full border p-4 rounded-xl'>
      <AreaChart />
      <div className='pl-2'>
        <p className='flex items-center text-2xl'>
          N3,445,456
          <sup>
            <ArrowUp />
          </sup>
        </p>
        <p className='text-battle-grey text-sm'>6 campaigns, 5900 customer </p>
      </div>
    </div>
  )
}

export default LoyaltyAttribute
