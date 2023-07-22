// import { campaigns } from '@/utilities/data/campaignJson'
import { ColumnsType } from 'antd/es/table'
import { Table } from 'antd'
import { AiOutlineMore } from 'react-icons/ai'
import PrupleBadge from '@/assets/svgs/purpleBadge.svg'
import GoldBadge from '@/assets/svgs/goldBadge.svg'
import { useRouter } from 'next/router'

const CampaignTable = () => {
  interface DataType {
    id: string
    campaign: string
    opted: number
    optedPercentage?: number
    allocationPoints: string
    allocationValue?: string
    status: string
    subscription: string
  }
  const router = useRouter()
  const columns: ColumnsType<DataType> = [
    {
      title: 'CAMPAIGN NAME',
      dataIndex: 'campaign',
      key: 'cammpaign',
      render: (text, { subscription }) => (
        <p className='flex gap-3 items-center'>
          <span>
            {subscription === 'gold' ? <GoldBadge /> : <PrupleBadge />}
          </span>
          {text}
        </p>
      ),
    },
    {
      title: 'OPTED IN',
      dataIndex: 'opted',
      key: 'optIn',
      render: (text, record) => (
        <p className='flex flex-col '>
          {text}
          <span className='text-[#999999]'>{`${record.optedPercentage}% of customers`}</span>
        </p>
      ),
    },
    {
      title: 'ALLOCATION POINTS',
      dataIndex: 'allocationPoints',
      key: 'allocationPoints',
      render: (text, record) => (
        <p className='flex flex-col '>
          {text}{' '}
          <span className='text-[#999999]'>{record.allocationValue}</span>
        </p>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '',
      key: 'options',
      dataIndex: 'options',
      render: () => <AiOutlineMore className='cursor-pointer' />,
    },
  ]

  const data: DataType[] = [
    {
      id: '1',
      campaign: '1 point for every N1 spent',
      opted: 32,
      allocationPoints: '50',
      optedPercentage: 43,
      allocationValue: '500,000',
      status: 'Active',
      subscription: 'gold',
    },
    {
      id: '2',
      campaign: '1 point for every N1 spent',
      opted: 32,
      allocationPoints: '50',
      optedPercentage: 43,
      allocationValue: '500,000',
      status: 'Active',
      subscription: 'gold',
    },
    {
      id: '3',
      campaign: 'J1 point for every N1 spent',
      opted: 32,
      allocationPoints: '50',
      optedPercentage: 43,
      allocationValue: '500,000',
      status: 'Active',
      subscription: 'silver',
    },
    {
      id: '4',
      campaign: '1 point for every N1 spent',
      opted: 32,
      allocationPoints: '50',
      optedPercentage: 43,
      allocationValue: '500,000',
      status: 'Active',
      subscription: 'silver',
    },
  ]

  return (
    <>
      <h2 className='mb-4 text-xl font-semibold'>Campaigns</h2>
      <Table
        onRow={(record) => ({
          onClick: () => router.push(`/loyaltyCampaign/campaign/${record.id}`),
        })}
        columns={columns}
        dataSource={data}
        className='max-w-[85%] pt-4'
      />
    </>
  )
}

export default CampaignTable
