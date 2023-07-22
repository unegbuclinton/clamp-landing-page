import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { Table } from 'antd'
import NameLogo from '../NameLogo/NameLogo'

interface DataType {
  id: string
  customer: string
  activeCampaign: string
  points: string
  email: string
  totalSpending?: string
}
const CustomerTable = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'CUSTOMER NAME',
      dataIndex: 'customer',
      key: 'customer',
      render: (text, { email }) => (
        <div className='flex gap-3 items-center'>
          <NameLogo name={text} />
          <div className='flex flex-col'>
            <p className='font-medium text-base'>{text}</p>
            <p className='text-battle-grey'> {email}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'ACTIVE CAMPAIGNS',
      dataIndex: 'activeCampaign',
      key: 'activeCampaign',
    },
    {
      title: 'POINTS',
      dataIndex: 'points',
      key: 'points',
    },
    {
      title: 'TOTAL SPENDING',
      dataIndex: 'totalSpending',
      key: 'totalSpending',
    },
  ]

  const data: DataType[] = [
    {
      id: '1',
      customer: 'Jachi Anikwe',
      activeCampaign: '3',
      points: '50',
      totalSpending: 'N12,255',
      email: 'jachinma10@gmail.com',
    },
    {
      id: '2',
      customer: 'Samuel Tally',
      activeCampaign: '3',
      points: '10',
      totalSpending: 'N16,355',
      email: 'samtally543@test.com',
    },
    {
      id: '3',
      customer: 'Lucius Unegbu',
      activeCampaign: '3',
      points: '25',
      totalSpending: 'N13,200',
      email: 'luciocorp@gmail.com',
    },
    {
      id: '4',
      customer: 'Daniel Isreal',
      activeCampaign: '3',
      points: '25',
      totalSpending: 'N10,220',
      email: 'danielisreal@outlook.com',
    },
    {
      id: '5',
      customer: 'Jon Snow',
      activeCampaign: '3',
      points: '100',
      totalSpending: 'N25,555',
      email: 'jonsnow@winterfell.com',
    },
  ]
  return (
    <div>
      <Table columns={columns} dataSource={data} className='max-w-[85%] pt-4' />
    </div>
  )
}

export default CustomerTable
