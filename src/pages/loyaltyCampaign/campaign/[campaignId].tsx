import React, { useEffect } from 'react'
import ArrowUp from '@/assets/svgs/arrow-up.svg'
import DashboardLayout from '@/components/layouts/dashboardLayout'
import { Divider, Button, Dropdown } from 'antd'
import GoldBadge from '@/assets/svgs/goldBadge.svg'
import { CiCircleMore } from 'react-icons/ci'
import type { MenuProps } from 'antd'
import { useRouter } from 'next/router'
import { RootState } from '@/store'
import { useAppSelector } from '@/utilities/hooks'
import ClientOnly, {
  formatDateToCustomFormat,
} from '@/utilities/helperFunctions'
import { LeftOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const CampaignDetail = ({ params }: { params: { campaignId: string } }) => {
  const { specificCampaign } = useAppSelector(
    (state: RootState) => state.campaign
  )
  const { specificRule } = useAppSelector((state: RootState) => state.rule)
  const { name, startDate, endDate, status, redemptionRules } = specificCampaign

  const formattedStartDate = dayjs(startDate).format('DD/MM/YYYY')
  const formattedEndDate = dayjs(endDate).format('DD/MM/YYYY')

  const router = useRouter()

  const data = [
    {
      header: 'Sales attributed',
      value: 'N0.00',
      //   subText: '24 new customers in the last 7 days',
    },
    {
      header: 'Customer opted in',
      value: '0',
      subText: '0% of customers',
    },
    {
      header: 'Points allocated',
      value: '0',
      subText: '0.00 in value',
    },
    {
      header: 'Claimed points',
      value: '0',
      subText: 'Claimed by 0 customers',
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
    <ClientOnly>
      <DashboardLayout>
        <div className='w-[60%]'>
          <span onClick={() => router.push('/loyaltyCampaign')}>
            <LeftOutlined color='#999999' className='cursor-pointer' />
          </span>
          <div className='flex justify-between items-center'>
            <h1 className='py-4 font-bold text-2xl'>{name}</h1>
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
                <h3>{header}</h3>
                <p className='flex items-center text-xl font-semibold'>
                  {value}
                  <sup>
                    <ArrowUp />
                  </sup>
                </p>
                <p className='text-dim-grey text-sm pt-1'>{subText}</p>
              </div>
            ))}
          </div>
          <Divider className='mt-14' />

          <div>
            <p className='py-4 text-base font-normal'>Overview</p>
            <div className='mb-10'>
              <p className='font-medium mb-3 text-dim-grey text-[10px]'>TYPE</p>
              <p className='flex font-medium items-center gap-3'>
                <span>
                  <GoldBadge />
                </span>
                Points
              </p>
            </div>
            <div className='mb-10'>
              <p className='font-medium mb-3 text-[10px] text-dim-grey'>
                STATUS
              </p>
              <p className='flex font-medium text-sm items-center gap-3'>
                {status?.toLocaleUpperCase()}
              </p>
            </div>

            <div>
              <p className='font-medium mb-3 text-[10px] text-dim-grey'>
                DURATION
              </p>
              <p className='flex font-medium text-sm items-center gap-3'>
                {`${formattedStartDate} - ${formattedEndDate}`}
              </p>
            </div>
            <Divider />
            <p className='py-4 text-base font-normal'>Preferences</p>

            <div className='py-6'>
              <p className='text-dim-grey text-[10px]'>CONDITION</p>
              {specificRule?.conditions?.[0]?.operator === 'gt' && (
                <p className='text-dim-grey text-sm'>
                  {`Customer earns points if transaction greater than ${specificRule?.conditions?.[0].value}`}
                </p>
              )}
              {specificRule?.conditions?.[0]?.operator === 'gte' && (
                <p className='text-dim-grey text-sm'>
                  {`Customer earns points if transaction greater than or equals ${specificRule?.conditions?.[0].value}`}
                </p>
              )}
              {specificRule?.conditions?.[0]?.operator === 'lt' && (
                <p className='text-dim-grey text-sm'>
                  {`Customer earns points if transaction less than ${specificRule?.conditions?.[0].value}`}
                </p>
              )}
              {specificRule?.conditions?.[0]?.operator === 'lte' && (
                <p className='text-dim-grey text-sm'>
                  {`Customer earns points if transaction less than or equals ${specificRule?.conditions?.[0].value}`}
                </p>
              )}
            </div>

            <div className='py-6'>
              <p className='text-dim-grey py-1.5 text-[10px]'>EFFECT</p>
              <p className='font-semibold  text-sm'>{`Customer earns ${specificRule?.assetQty} point`}</p>
            </div>

            <div className='py-6'>
              <p className='text-dim-grey py-1.5 text-[10px]'>REDEMPTION</p>
              <p className='font-semibold text-sm'>
                {redemptionRules?.[0].liquidationInstrument.toLocaleUpperCase()}
              </p>
            </div>
            <div className='py-6'>
              <p className='text-dim-grey text-[10px]'>
                POINTS NEEDED FOR REDEMPTION
              </p>
              <p className='font-semibold py-1.5 text-sm'>{`${redemptionRules?.[0].assetConditions?.[0].value} POINTS`}</p>
              {redemptionRules?.[0].assetConditions?.[0].operator === 'gte' && (
                <p className='text-dim-grey text-xs'>
                  Customer redeems points if greater than or equals to{' '}
                  {redemptionRules?.[0].assetConditions?.[0].value}
                </p>
              )}
              {redemptionRules?.[0].assetConditions?.[0].operator === 'gt' && (
                <p className='text-dim-grey text-xs'>
                  Customer can redeem points if greater than{' '}
                  {redemptionRules?.[0].assetConditions?.[0].value}
                </p>
              )}
              {redemptionRules?.[0].assetConditions?.[0].operator === 'lt' && (
                <p className='text-dim-grey text-xs'>
                  Customer earns points if less than{' '}
                  {redemptionRules?.[0].assetConditions?.[0].value}
                </p>
              )}
              {redemptionRules?.[0].assetConditions?.[0].operator === 'lte' && (
                <p className='text-dim-grey text-xs'>
                  Customer earns points if less than or eqals to{' '}
                  {redemptionRules?.[0].assetConditions?.[0].value}
                </p>
              )}
              {redemptionRules?.[0].assetConditions?.[0].operator === 'eq' && (
                <p className='text-dim-grey text-xs'>
                  Customer earns points if equals to
                  {redemptionRules?.[0].assetConditions?.[0].value}
                </p>
              )}
            </div>
          </div>
          <Divider />

          <Button
            style={{ border: '1px solid #E6E6E6', fontWeight: 600 }}
            type='text'
            danger
          >
            End Campaign
          </Button>
        </div>
      </DashboardLayout>
    </ClientOnly>
  )
}

export default CampaignDetail
