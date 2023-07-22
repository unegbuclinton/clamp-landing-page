import React from 'react'
import ArrowUp from '@/assets/svgs/arrow-up.svg'
import DashboardLayout from '@/components/layouts/dashboardLayout'
import { Divider, Button, Dropdown } from 'antd'
import GoldBadge from '@/assets/svgs/goldBadge.svg'
import { LeftOutlined } from '@ant-design/icons'
import { CiCircleMore } from 'react-icons/ci'
import type { MenuProps } from 'antd'
import { useRouter } from 'next/router'
const CampaignDetail = ({ params }: { params: { campaignId: string } }) => {
  console.log(params)
  const router = useRouter()
  const data = [
    {
      header: 'Sales attributed',
      value: 'N24,559,394.97',
      subText: '24 new customers in the last 7 days',
    },
    {
      header: 'Customer opted in',
      value: '97',
      subText: '12% of customers',
    },
    {
      header: 'Points allocated',
      value: '2000',
      subText: 'N1.5M in value',
    },
    {
      header: 'Claimed points',
      value: '673',
      subText: 'Claimed by 45 customers',
    },
  ]

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Pause campaign',
    },
    {
      key: '2',
      label: 'End campaign',
    },
    {
      key: '3',
      label: 'Edit',
    },
  ]
  return (
    <DashboardLayout>
      <div className='w-[85%]'>
        <span onClick={() => router.push('/loyaltyCampaign')}>
          <LeftOutlined color='#999999' className='cursor-pointer' />
        </span>
        <div className='flex justify-between items-center mt-3'>
          <h1 className='py-4 font-bold text-xl'>
            1 point for every dollar spent
          </h1>
          <Dropdown className='cursor-pointer' menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <CiCircleMore size={20} fill='#999999' />
            </a>
          </Dropdown>
        </div>
        <h2 className='py-4'>Key Metrics</h2>
        <div className='grid grid-cols-2 gap-[11px]'>
          {data?.map(({ header, value, subText }, idx) => (
            <div key={idx} className='w-full border p-4 rounded-xl'>
              <h3 className='mb-6'>{header}</h3>
              <p className='flex items-center text-2xl font-bold'>
                {value}
                <sup>
                  <ArrowUp />
                </sup>
              </p>
              <p className='text-dim-grey pt-1'>{subText}</p>
            </div>
          ))}
        </div>
        <Divider className='mt-14 pb-6' />

        <div>
          <p className='py-4 text-xl font-normal'>Overview</p>
          <div className='mb-10'>
            <p className='font-medium mb-3 text-dim-grey'>TYPE</p>
            <p className='flex font-medium text-xl items-center gap-3'>
              <span>
                <GoldBadge />
              </span>
              Points
            </p>
          </div>
          <div className='mb-10'>
            <p className='font-medium mb-3 text-dim-grey'>STATUS</p>
            <p className='flex font-medium text-base items-center gap-3'>
              ACTIVE
            </p>
          </div>

          <div>
            <p className='font-medium mb-3 text-dim-grey'>DURATION</p>
            <p className='flex font-medium text-xl items-center gap-3'>
              2/12/2023 – No end date
            </p>
          </div>
          <Divider />
          <p className='py-4 text-xl font-normal'>Preferences</p>

          <div className='py-6'>
            <p className='text-dim-grey'>CONDITION</p>
            <p className='font-medium text-xl py-1.5'>TRANSACTION</p>
            <p className='text-dim-grey'>
              Customer earns points if `{'>'}` or = $1
            </p>
          </div>

          <div className='py-6'>
            <p className='text-dim-grey py-1.5'>EFFECT</p>
            <p className='font-medium text-xl'>Customer earns 1 point</p>
          </div>
          <div className='py-6'>
            <p className='text-dim-grey'>POINTS NEEDED</p>
            <p className='font-medium text-xl py-1.5'>20 POINTS</p>
            <p className='text-dim-grey'>
              Customer earns points if `{'>'}` or = $1
            </p>
          </div>
        </div>

        <Button
          style={{ border: '1px solid #E6E6E6', fontWeight: 600 }}
          type='text'
          danger
        >
          End Campaign
        </Button>
      </div>
    </DashboardLayout>
  )
}

export default CampaignDetail
