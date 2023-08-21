import React from 'react'
import Magnet from '@/assets/svgs/magnet.svg'
import Chart from '@/assets/svgs/sales-chart.svg'
import Engage from '@/assets/svgs/engagement.svg'
import Time from '@/assets/svgs/time.svg'

const SectionTwo = () => {
  return (
    <div className='section flex flex-wrap border-r border-light-grey/90'>
      <div className='w-1/2 border-light-grey/90 border-r border-b rounded-br-3xl pt-[38px] pl-32 '>
        <Magnet />
        <div className='mt-10'>
          <h2 className='text-2xl w-[200px] mb-4'>
            INCREASE CUSTOMER <span className='font-bold'>RETENTION</span>
          </h2>
          <p className='text-dim-grey text-[15px] max-w-[240px]'>
            Keep customers coming back with a tailored loyalty program that
            rewards repeat purchases.
          </p>
        </div>
      </div>
      <div className='w-1/2 border-light-grey/90  border-l border-b rounded-bl-3xl pt-[38px] pl-24 '>
        <Chart />
        <div className='mt-8'>
          <h2 className='text-2xl max-w-[250px] mb-4'>
            DRIVE REPEAT <span className='font-bold'>PURCHASE</span>
          </h2>
          <p className='text-dim-grey text-[15px] max-w-[240px]'>
            Incentivize customers to buy more and spend more to earn exclusive
            rewards and benefits.
          </p>
        </div>
      </div>
      <div className='w-1/2 border-light-grey/90  border-r border-t rounded-tr-3xl pt-[38px] pl-32'>
        <Engage />
        <div className='mt-10'>
          <h2 className='text-2xl w-[200px] mb-4'>
            <span className='font-bold'> ENGAGE</span> YOUR CUSTOMERS
          </h2>
          <p className='text-dim-grey text-[15px] max-w-[240px]'>
            Create a community that makes customers feel valued through
            personalized challenges and promotions.
          </p>
        </div>
      </div>
      <div className='w-1/2 border-light-grey/90  border-l border-t rounded-tl-3xl pt-[38px] pl-24'>
        <Time />
        <div className='mt-8'>
          <h2 className='text-2xl w-[200px] mb-4'>
            INCREASE <span className='font-bold'> LIFE TIME VALUE</span>
          </h2>
          <p className='text-dim-grey text-[15px] max-w-[260px]'>
            Offer loyal customers progressively better rewards so they remain
            customers for life. customer retention
          </p>
        </div>
      </div>
    </div>
  )
}

export default SectionTwo
