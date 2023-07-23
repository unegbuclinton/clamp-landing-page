// import { campaigns } from '@/utilities/data/campaignJson'
import { ColumnsType } from 'antd/es/table'
import { Table } from 'antd'
import { AiOutlineMore } from 'react-icons/ai'
import PrupleBadge from '@/assets/svgs/purpleBadge.svg'
import GoldBadge from '@/assets/svgs/goldBadge.svg'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/utilities/hooks'
import { getAllCampaign } from '@/utilities/redux/CampaignFormSlice'
import { RootState } from '@/store'
import { createCampaignInterface } from '@/utilities/types/createCampaign'
import ClientOnly from '@/utilities/helperFunctions'

interface DataType {
  id: string
  name: string
  opted: number
  optedPercentage?: number
  allocationPoints: string
  allocationValue?: string
  status: string
  subscription: string
}
const CampaignTable = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)

  const { allCampaigns } = useAppSelector((state: RootState) => state.campaign)

  useEffect(() => {
    setLoading(true)
    dispatch(getAllCampaign())
    setLoading(false)
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
            {/* {subscription === 'gold' ? <GoldBadge /> : <PrupleBadge />} */}
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
      render: (text, record) => (
        <p className='flex flex-col '>
          {text}{' '}
          {/* <span className='text-[#999999]'>{record.allocationValue}</span> */}
        </p>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
    },
  ]

  return (
    <ClientOnly>
      <h2 className='mb-4 text-xl font-semibold'>Campaigns</h2>
      <Table
        onRow={(record) => ({
          onClick: () => router.push(`/loyaltyCampaign/campaign/${record.id}`),
        })}
        columns={columns}
        dataSource={allCampaigns}
        className='max-w-[85%] pt-4'
      />
    </ClientOnly>
  )
}

export default CampaignTable
