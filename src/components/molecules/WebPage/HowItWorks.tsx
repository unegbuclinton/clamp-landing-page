import React from 'react'

const HowItWorks = () => {
  return (
    <div className='section pl-[112px] flex flex-col justify-center gap-10 border-r border-light-grey/90'>
      <h2 className='text-[32px] max-w-[450px]'>
        HOW DOES IT WORK? WELL, IT&apos;S AS EASY AS
        <br />
        <span className='font-bold'>TRIGGER.</span>
        <br />
        <span className='font-bold'>EFFECT.</span>
        <br />
        <span className='font-bold'>REWARD.</span>
      </h2>

      <p className='text-dim-grey text-lg max-w-[500px]'>
        Configure triggers that incentivise your customers. Make a purchase?
        Earn points. Refer a friend? Reach a new tier. The possibilities are
        endless.
      </p>
    </div>
  )
}

export default HowItWorks
