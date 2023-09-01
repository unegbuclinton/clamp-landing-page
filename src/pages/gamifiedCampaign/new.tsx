import React from 'react'
import { useRouter } from 'next/router'
import { Form, Input, InputNumber, Select } from 'antd'
import ButtonComponent from '@/components/atoms/button'
import InfoCard from '@/components/molecules/infoCard'
import DashboardLayout from '@/components/layouts/dashboardLayout'

const NewGamifiedCampaign = () => {
  const router = useRouter()
  const { Option } = Select
  const [selectedOption, setSelectedOption] = React.useState('day')
  const handleFreqChange = (value: any) => {}
  const handleEarningChange = (value: any) => {}
  return (
    <DashboardLayout>
      <div className="flex flex-col justify-center w-full">
        <h3 className="text-xl font-bold w-full text-gray-700  mb-8">Gamified Campaign</h3>
        <Form>
          <InfoCard description="Campaign name">
            <Form.Item
              name="campaignName"
              rules={[{ required: true, message: 'Please input your campaign name!' }]}
            >
              <Input
                className="bg-transparent border-none shadow-none p-0 focus:border focus:border-black"
                placeholder="E.g. Weekly top buyers"
              />
            </Form.Item>
          </InfoCard>
          <InfoCard label="FREQUENCY" description={'Award prize(s) every'}>
            <Form.Item name="rewardFrequency">
              <Select
                className="cursor-pointer"
                style={{ width: '100%' }}
                placeholder="Set frequency"
                onChange={handleFreqChange}
              >
                {['day', 'week', 'month']?.map((value) => (
                  <Option key={value} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </InfoCard>
          <InfoCard label="REWARD" description="Customer earns">
            <Form.Item
              className="m-0"
              name="campaignEarnings"
              rules={[{ required: true, message: '' }]}
            >
              <span className="align-text-top text-lg">&#8358; </span>
              <InputNumber
                className="shadow-lg w-60 h-[32px] text-right mr-2"
                placeholder="1"
                onChange={handleEarningChange}
              />
            </Form.Item>
          </InfoCard>
        </Form>
      </div>
    </DashboardLayout>
  )
}

export default NewGamifiedCampaign
