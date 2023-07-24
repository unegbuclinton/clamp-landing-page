import React from 'react'
import ArrowUp from '@/assets/svgs/arrow-up.svg'
import AreaChart from '../AreaChart'
import { RootState } from '@/store'
import { useAppSelector } from '@/utilities/hooks'

const LoyaltyAttribute = () => {
  const { allCampaigns } = useAppSelector((state: RootState) => state.campaign)
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
        <p className='text-battle-grey text-sm'>{`${allCampaigns.length} campaigns, 5900 customer `}</p>
      </div>
    </div>
  )
}

export default LoyaltyAttribute