import DashboardLayout from '@/components/layouts/dashboardLayout'
import ClientOnly from '@/utilities/helperFunctions'
import GoldBadge from '@/assets/svgs/goldBadge.svg'
import Dice from '@/assets/imgs/dice1.png'
import React from 'react'
import Link from 'next/link'

const CampaignSelection = () => {
  const campaignType: Array<{
    type: string
    text: string
    route: string
    icon: any
  }> = [
    {
      type: 'Points based',
      text: 'Your customer earn rewards based on points.',
      route: '/createCampaign',
      icon: <GoldBadge />,
    },
    {
      type: 'Gamified',
      text: 'You can set prizes for customers to win.',
      route: '/gamifiedCampaign/new',
      icon: <img src={Dice.src} alt='' className='h-10' />,
    },
  ]
  return (
    <ClientOnly>
      <DashboardLayout>
        <div className=' flex justify-center mb-6'>
          <div className='relative max-w-[462px] '>
            <h1 className='text-2xl font-semibold mb-2'>
              Create Rewards Campaign
            </h1>
            <p>Select Campaign type</p>
            <div className='flex gap-2 mt-4'>
              {campaignType?.map(({ type, text, route, icon }) => (
                <Link
                  href={route}
                  className='p-4 rounded-2xl border max-w-[280px] cursor-pointer'
                >
                  {icon}
                  <p className='text-base mt-4'>{type}</p>
                  <p className='text-black/60 text-sm'>{text}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ClientOnly>
  )
}

export default CampaignSelection
