import React from 'react'

const CustomerSection = () => {
  return (
    <div className='section pl-[112px] flex flex-col justify-center gap-10 border-r border-light-grey/90'>
      <h2 className='text-[32px] max-w-[550px]'>
        CUSTOMER CAN SEE <span className='font-bold'>REWARDS</span> EARNED AND
        REDEEM THEM
      </h2>

      <p className='text-dim-grey text-lg max-w-[500px]'>
        Reward screens for your customers to see how much rewards they have
        earned, actions they need to take to redeem the rewards and see more
        campaign offerings.
      </p>
    </div>
  )
}

export default CustomerSection
