import DashboardLayout from '@/components/layouts/dashboardLayout'
import CampaignTable from '@/components/molecules/campaignTable'
import React from 'react'

const LoyaltyCampaigns = () => {
  return (
    <DashboardLayout>
      {/* <h1 className='font-bold mb-[38px] text-2xl'>Campaigns</h1> */}
      <CampaignTable />
    </DashboardLayout>
  )
}

export default LoyaltyCampaigns
