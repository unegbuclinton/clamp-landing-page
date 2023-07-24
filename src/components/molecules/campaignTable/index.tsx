import { ColumnsType } from 'antd/es/table'
import { Table } from 'antd'
import GoldBadge from '@/assets/svgs/goldBadge.svg'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/utilities/hooks'
import {
  getAllCampaign,
  getSpecificCampaign,
} from '@/utilities/redux/CampaignFormSlice'
import { RootState } from '@/store'
import { createCampaignInterface } from '@/utilities/types/createCampaign'
import ClientOnly from '@/utilities/helperFunctions'

const CampaignTable = () => {
  const dispatch = useAppDispatch()

  const { allCampaigns } = useAppSelector((state: RootState) => state.campaign)

  useEffect(() => {
    dispatch(getAllCampaign())
  }, [])

  const router = useRouter()
  const columns: ColumnsType<createCampaignInterface> = [
    {
      title: 'CAMPAIGN NAME',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <p className='flex gap-3 items-center'>
          <span>
            <GoldBadge />
          </span>
          {text}
        </p>
      ),
    },

    {
      title: 'ALLOCATED POINTS',
      dataIndex: 'allocationPoints',
      key: 'allocationPoints',
      render: (text, record) => <p className='flex flex-col '>{text} </p>,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
    },
  ]

  return (
    <ClientOnly>
      <>
        <h2 className='mb-4 text-xl font-semibold'>Campaigns</h2>
        <Table
          style={{ fontFamily: 'Inter' }}
          onRow={(record) => ({
            onClick: () =>
              dispatch(getSpecificCampaign(record.id)).then((data) => {
                if (data.payload) {
                  router.push(`/loyaltyCampaign/campaign/${record.id}`)
                }
              }),
          })}
          columns={columns}
          dataSource={allCampaigns}
          className='max-w-[85%] pt-4'
        />
      </>
    </ClientOnly>
  )
}

export default CampaignTable
