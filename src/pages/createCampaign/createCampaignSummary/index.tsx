import React from 'react'
import InfoCard from '@/components/molecules/infoCard'
import { useAppSelector } from '@/utilities/hooks'
import { RootState } from '@/store'
const CreateCampaignSummary = () => {
  const { createCampaignData, redemptionType } = useAppSelector(
    (state: RootState) => state.campaign
  )

  const {
    campaignEarnings,
    campaignName,
    campaignRedeem,
    campaignTriggerValue,
    campaignReward,
    earningType,
  } = createCampaignData
  return (
    <div>
      <p className='text-xs text-dim-grey mb-4'>Step 2 of 2</p>
      <h1 className='font-semibold text-xl'>Summary</h1>

      <InfoCard outline description='Campaign name' subText={campaignName} />
      <InfoCard
        outline
        description='Every time customer spends'
        subText={`${campaignTriggerValue} `}
      >
        <div className='py-4'>
          <p className='text-dim'>Customer earns</p>
          <p className='font-medium'>{campaignEarnings}</p>
        </div>
        <div className='py-4'>
          <p className='text-dim'>Earning Type</p>
          <p className='font-medium'>{earningType}</p>
        </div>
      </InfoCard>

      <InfoCard
        outline
        subText='Points needed to redeemed reward'
        description={campaignRedeem}
      >
        <div className='py-4'>
          <p className='text-dim'>Reward</p>
          <p className='font-semibold'>{redemptionType}</p>
        </div>
        <div className='py-4'>
          <p className='text-dim'>Cashback amount</p>
          <p className='font-semibold'>{`${campaignReward} ${
            redemptionType === 'Cashback' ? 'dollars' : '%'
          }`}</p>
        </div>
      </InfoCard>
    </div>
  )
}

export default CreateCampaignSummary
