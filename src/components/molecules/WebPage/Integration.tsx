import React from 'react'
import DataFlowImg from '@/assets/svgs/data-flow.svg'

const Integration = () => {
  return (
    <div className='section lg:pl-[112px] px-6 md:px-4 flex flex-col justify-center gap-10 border-r border-light-grey/90'>
      <h2 className='text-[32px] max-w-[550px]'>
        <span className='font-bold'> ONE-TIME</span> QUICK INTEGRATION, CREATE
        <span className='font-bold'> MULTIPLE CAMPAIGNS</span> WITH
        <span className='font-bold'> NO CODE NEEDED.</span>
      </h2>

      <p className='text-dim-grey text-lg max-w-[500px]'>
        Connect to your application via API and then you can set campaign rules
        & rewards, watch results and iterate seamlessly where necessary.
      </p>
      <div className='md:hidden flex justify-center border-b py-4'>
        <DataFlowImg />
      </div>
    </div>
  )
}

export default Integration
