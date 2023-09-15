import React from 'react'
import CustomerImg from '@/assets/svgs/customer.svg'

const CustomerSection = () => {
  return (
    <div className='section lg:pl-[112px] px-6 md:px-4 flex flex-col justify-center gap-10 border-r border-light-grey/90'>
      <h2 className='text-[32px] max-w-[550px]'>
        CUSTOMER CAN MONITOR <span className='font-bold'>REWARDS EARNED</span>{' '}
        AND
        <span className='font-bold'> REDEEM THEM</span>
      </h2>

      <p className='text-dim-grey text-2xl lg:text-lg max-w-[500px]'>
        Reward screens for your customers to see how much rewards they have
        earned, actions they need to take to redeem the rewards and see more
        campaign offerings.
      </p>
      <div className='md:hidden flex justify-center border-b py-4'>
        <CustomerImg />
      </div>
    </div>
  )
}

export default CustomerSection
