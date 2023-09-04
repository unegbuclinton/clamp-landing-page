import React, { useState, useEffect } from 'react'
import ArrowUp from '@/assets/svgs/arrow-up.svg'
import DashboardLayout from '@/components/layouts/dashboardLayout'
import { Divider, Button, Dropdown, message } from 'antd'
import GoldBadge from '@/assets/svgs/goldBadge.svg'
import { CiCircleMore } from 'react-icons/ci'
import type { MenuProps } from 'antd'
import { useRouter } from 'next/router'
import { RootState } from '@/store'
import { useAppDispatch, useAppSelector } from '@/utilities/hooks'
import ClientOnly from '@/utilities/helperFunctions'
import { LeftOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import {
  continueSpecificCampaign,
  endSpecificCampaign,
  pauseSpecificCampaign,
  startSpecificCampaign,
} from '@/utilities/redux/CampaignFormSlice'
import Link from 'next/link'
import {
  data,
  generateConditionText,
  generateRedemptionConditionText,
} from '@/utilities/campaignData'

dayjs.extend(utc)

const CampaignDetail = () => {
  const { specificCampaign } = useAppSelector(
    (state: RootState) => state.campaign
  )

  const { specificRule } = useAppSelector((state: RootState) => state.rule)
  const { name, startDate, endDate, status, redemptionRules, id } =
    specificCampaign

  const formattedStartDate = dayjs(startDate).utc().format('DD/MM/YYYY')
  const formattedEndDate = dayjs(endDate).utc().format('DD/MM/YYYY')
  const [redemptiontextText, setRedemptionText] = useState<string>('')
  const condition = specificRule?.conditions?.[0]
  const redemptionCondition = redemptionRules?.[0]?.assetConditions?.[0]

  const [conditionInfo, setConditionInfo] = useState<{
    header: string
    description: string
  }>({ header: '', description: '' })
  const router = useRouter()
  const dispatch = useAppDispatch()

  const adminEvent = specificCampaign.adminEvents

  const onClickFunction =
    status === 'active'
      ? () => dispatch(pauseSpecificCampaign(id))
      : status === 'inactive'
      ? () => dispatch(continueSpecificCampaign(id))
      : () => dispatch(startSpecificCampaign(id))

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: `${
        status === 'active'
          ? 'Pause campaign'
          : status === 'inactive'
          ? 'Continue campaign'
          : 'Start campaign'
      }`,
      onClick: onClickFunction,
      disabled:
        adminEvent &&
        adminEvent[adminEvent.length - 1].eventName === 'stop-campaign',
    },
    {
      key: '2',
      label: 'End campaign',
      onClick: () => dispatch(endSpecificCampaign(id)),
      disabled:
        adminEvent &&
        adminEvent[adminEvent.length - 1].eventName === 'stop-campaign',
    },
    {
      key: '3',
      label: (
        <Link href={`/createCampaign?mode=edit&campaignId=${id}`}>Edit</Link>
      ),
      disabled:
        adminEvent &&
        adminEvent[adminEvent.length - 1].eventName === 'stop-campaign',
    },
  ]

  useEffect(() => {
    if (condition) {
      const {
        operator: conditionOperator,
        value: conditionValue,
        key,
      } = condition
      const { header, description } = generateConditionText(
        conditionOperator,
        String(conditionValue),
        key
      )
      setConditionInfo({ header, description })
    }
  }, [condition])

  // Redemption
  useEffect(() => {
    if (redemptionCondition) {
      const { operator, value } = redemptionCondition
      const conditionText = generateRedemptionConditionText(operator, value)
      setRedemptionText(conditionText)
    }
  }, [redemptionCondition])

  const { campaignId } = router.query
  const isValidId = campaignId === id

  if (!isValidId) {
    router.replace('/404Page')
    return null
  }
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
                {(adminEvent &&
                  adminEvent[adminEvent.length - 1].eventName !==
                    'stop-campaign') ||
                !adminEvent ? (
                  <> {status?.toLocaleUpperCase()}</>
                ) : (
                  <> ENDED</>
                )}
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

              {conditionInfo && (
                <>
                  {' '}
                  <p className='font-semibold text-sm'>
                    {conditionInfo.header}
                  </p>
                  <p className='text-dim-grey text-sm'>
                    {conditionInfo.description}
                  </p>
                </>
              )}
            </div>

            <div className='py-6'>
              <p className='text-dim-grey py-1.5 text-[10px]'>EFFECT</p>
              <p className='font-semibold  text-sm'>{`Customer earns ${specificRule?.assetQty} point`}</p>
            </div>

            <div className='py-6'>
              <p className='text-dim-grey py-1.5 text-[10px]'>REDEMPTION</p>
              <p className='font-semibold text-sm'>
                {redemptionRules?.[0]?.liquidationInstrument.toLocaleUpperCase()}
              </p>
            </div>
            <div className='py-6'>
              <p className='text-dim-grey text-[10px]'>
                POINTS NEEDED FOR REDEMPTION
              </p>
              <p className='font-semibold py-1.5 text-sm'>{`${redemptionRules?.[0]?.assetConditions?.[0].value} POINTS`}</p>
              <p className='text-dim-grey text-xs'>{redemptiontextText}</p>
            </div>
          </div>
          <Divider />

          {(adminEvent &&
            adminEvent[adminEvent.length - 1].eventName !== 'stop-campaign') ||
          !adminEvent ? (
            <Button
              style={{ border: '1px solid #E6E6E6', fontWeight: 600 }}
              type='text'
              danger
              onClick={
                status === 'active'
                  ? () => dispatch(endSpecificCampaign(id))
                  : status === 'inactive'
                  ? () => dispatch(continueSpecificCampaign(id))
                  : () => dispatch(startSpecificCampaign(id))
              }
            >
              {status === 'active' && 'End campaign'}
              {status === 'inactive' && 'Resume campaign'}
              {status === 'draft' && 'Start campaign'}
            </Button>
          ) : null}
        </div>
      </DashboardLayout>
    </ClientOnly>
  )
}

export default CampaignDetail
