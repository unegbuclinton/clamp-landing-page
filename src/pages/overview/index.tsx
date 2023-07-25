import DashboardLayout from '@/components/layouts/dashboardLayout'
import ActivityInfo from '@/components/molecules/ActivityInfo'
import LoyaltyAttribute from '@/components/molecules/LoyaltyAttributeAnalysis'
import PointAnalysisCard from '@/components/molecules/PointAnalysisCard'
import CampaignTable from '@/components/molecules/campaignTable'
import { activities } from '@/utilities/data/activitiesJson'
import ClientOnly from '@/utilities/helperFunctions'

const Overview = () => {
  return (
    <ClientOnly>
      <DashboardLayout>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold mb-[38px] text-2xl'>Overview Page</h1>
        </div>

        <div className='flex gap-4 w-[85%] mb-11 max-h-[450px]'>
          <LoyaltyAttribute />
          <PointAnalysisCard />
        </div>
        <CampaignTable />
        <div>
          <h2 className='mb-4 text-xl font-semibold'>Activities</h2>
          <div className='rounded border border-light-grey p-6 w-[85%]'>
            {activities?.map(({ badge, timestamp, title }, index) => (
              <ActivityInfo
                key={index}
                title={title}
                badge={badge}
                time={timestamp}
              />
            ))}
          </div>
        </div>
      </DashboardLayout>
    </ClientOnly>
  )
}

export default Overview
