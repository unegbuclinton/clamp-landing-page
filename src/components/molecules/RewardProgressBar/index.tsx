import React from 'react'
import Gift from '@/assets/svgs/gift.svg'

const RewardProgressBar = () => {
  return (
    <div className='mb-4'>
      <div className='bg-white flex mt-2'>
        <div className='flex items-center'>
          <div className='h-[8px] w-[8px] bg-black rounded-full'></div>
          <div className='w-[81px] h-[2px]  bg-black -ml-1'></div>
        </div>

        <div className='flex items-center -ml-1'>
          <div className='h-[8px] w-[8px] bg-black rounded-full'></div>
          <div className='w-[81px] h-[2px]  bg-black -ml-1'></div>
        </div>

        <div className='flex items-center -ml-1'>
          <div className='h-[8px] w-[8px] bg-black rounded-full z-10'></div>
          <div className='w-[81px] h-[2px]  bg-platimum -ml-1'></div>
        </div>

        <div className='flex items-center -ml-1'>
          <div className='h-[8px] w-[8px] bg-platimum rounded-full'></div>
          <div className='w-[81px] h-[2px]  bg-platimum -ml-1'></div>
        </div>
        <div className='flex items-center -ml-1'>
          <div className='h-[8px] w-[8px] bg-platimum rounded-full'></div>
          <div className='w-[81px] h-[2px]  bg-platimum -ml-1'></div>
        </div>
        <div className='flex items-center -ml-1'>
          <div className='h-[8px] w-[8px] bg-platimum rounded-full'></div>
          <div className='w-[81px] h-[2px]  bg-platimum -ml-1'></div>
        </div>
        <div className='flex items-center -ml-1'>
          <div className='h-fit w-fit bg-platimum rounded-full p-[6px]'>
            <Gift />
          </div>
        </div>
      </div>
      <div className='flex justify-between text-platimum mt-1 text-xs'>
        <p>Start</p>
        <p>Unlock reward</p>
      </div>
    </div>
  )
}

export default RewardProgressBar
