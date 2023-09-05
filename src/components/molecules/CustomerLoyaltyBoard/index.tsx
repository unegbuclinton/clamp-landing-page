import React from 'react'
import LoyaltyTransaction from '@/assets/svgs/transaction.svg'
import LoyaltyTime from '@/assets/svgs/loyaltyTime.svg'
import LoyaltyReward from '@/assets/svgs/reward.svg'
import { Button } from 'antd'
import RewardProgressBar from '../RewardProgressBar'

const CustomerLoyaltyBoard = () => {
  return (
    <div className='p-4 border border-light-grey/90 rounded-xl w-[35%] h-fit'>
      <div className='flex justify-between mb-2'>
        <h2 className='text-base font-semibold'>Loyalty status</h2>
        <p className='px-2 bg-light-grey/90 rounded-2xl text-xs flex items-center'>
          Transaction
        </p>
      </div>
      <p className='text-sm text-[#666] mb-4'>Name of campaign goes here</p>
      <h2 className='text-2xl font-semibold'>
        21/35{' '}
        <span className='text-xs font-normal text-[#666]'>points earned</span>
      </h2>
      <RewardProgressBar />
      <div className='p-4 bg-platimum rounded-lg border-l-[3px] mb-4'>
        <div className='flex gap-4 mb-3'>
          <LoyaltyTransaction />
          <div>
            <p className='text-[#666] text-sm'>What to do</p>
            <p className='text-sm font-semibold'>7 transactions</p>
          </div>
        </div>
        <div className='flex gap-4 mb-3'>
          <LoyaltyTime />
          <div>
            <p className='text-[#666] text-sm'>When</p>
            <p className='text-sm font-semibold'>
              When 24th Aug 22 – 24th Oct 22
            </p>
          </div>
        </div>
        <div className='flex gap-4 mb-3'>
          <LoyaltyReward />
          <div>
            <p className='text-[#666] text-sm'>Your reward</p>
            <p className='text-sm font-semibold text-[#11B702]'>
              N1000 cashback
            </p>
          </div>
        </div>
      </div>
      <Button className='loyalty-btn'>See campaign details</Button>
    </div>
  )
}

export default CustomerLoyaltyBoard
