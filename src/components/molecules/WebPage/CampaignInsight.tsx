import React, { forwardRef } from 'react'
import Overview from '@/assets/svgs/overview.svg'

const CampaignInsight = forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <div
      ref={ref}
      id='CampaignInsight'
      className='section lg:pl-[112px] px-6 md:px-4 flex flex-col justify-center gap-10 border-r border-light-grey/90'
    >
      <h2 className='text-[32px] max-w-[550px]'>
        TRACK <span className='font-bold'>SALES,CUSTOMER ENGAGEMENT</span> AND
        SEE THE IMPACT.
      </h2>

      <p className='text-dim-grey text-2xl lg:text-lg max-w-[500px]'>
        Gain data-driven insights into customer behavior. Analyze engagement
        metrics, track sales trends, and quantify program ROI to optimize and
        demonstrate campaign success.
      </p>
      <div className='flex md:hidden justify-center border-b py-4'>
        <Overview />
      </div>
    </div>
  )
})
CampaignInsight.displayName = 'CampaignInsight'
export default CampaignInsight
