import React from 'react'
import { useRouter } from 'next/router'
import { Form, Input, InputNumber, Select } from 'antd'
import ButtonComponent from '@/components/atoms/button'
import InfoCard from '@/components/molecules/infoCard'
import DashboardLayout from '@/components/layouts/dashboardLayout'
const { Option } = Select

interface NewGamifiedCampaignFormValues {
  campaignName: string
  rewardFrequency: string
  winnerCount: number
  rewardAmount: number
}

const NewGamifiedCampaign = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  const handleSubmit = (values: NewGamifiedCampaignFormValues) => {
    console.log(values)
  }

  const winningCriteria: Record<string, string> = {
    h_spend: 'Highest spend',
    h_trxn_vol: 'Highest transaction volume',
    h_trxn_amt: 'Highest transaction amount',
    h_growth_trxn_vol: 'Highest transaction volume growth',
    h_growth_trxn_vol_p: 'Highest transaction volume growth %',
    h_growth_trxn_amt: 'Highest transaction amount growth',
    h_growth_trxn_amt_p: 'Highest transaction amount growth %',
    l_cancel_rate: 'Lowest cancellation rate',
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col justify-center w-full">
        <h3 className="text-xl font-bold w-full text-gray-700  mb-8">Gamified Campaign</h3>
        <Form form={form} onFinish={handleSubmit} noValidate>
          <InfoCard description="Campaign name">
            <Form.Item
              name="campaignName"
              rules={[{ required: true, message: 'Please input your campaign name.' }]}
            >
              <Input
                className="bg-transparent border-none shadow-none p-0 focus:border focus:border-black"
                placeholder="E.g. Weekly top buyers"
              />
            </Form.Item>
          </InfoCard>
          <InfoCard label="FREQUENCY" description={'Award prize(s) every'}>
            <Form.Item
              name="rewardFrequency"
              rules={[{ required: true, message: 'Please select frequency.' }]}
            >
              <Select
                className="cursor-pointer"
                style={{ width: '100%' }}
                placeholder="Set frequency"
              >
                {['day', 'week', 'month'].map((value) => (
                  <Option key={value} value={value}>
                    {value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </InfoCard>
          <InfoCard label="WINNERS" description="After each round">
            <Form.Item
              className="m-0"
              name="winnerCount"
              // rules={[{ required: true, message: 'Set number of winners in each round' }]}
            >
              <Input
                className="bg-transparent border-none shadow-none p-0 focus:border focus:border-black inline-block w-10 mr-1"
                placeholder="10"
                // step={1}
                // min={1}
                // onChange={handleWinnersChange}
              />{' '}
              <span> winner(s) will be selected</span>
            </Form.Item>
          </InfoCard>
          <InfoCard label="REWARD" description="Each winner earns">
            <Form.Item
              className="m-0"
              name="rewardAmount"
              // rules={[{ required: true, message: 'Enter prize money amount' }]}
            >
              <span className="align-top leading-8">&#8358; </span>
              <InputNumber
                className="bg-transparent border-none shadow-none p-0 focus:border focus:border-black inline-block w-60"
                placeholder="100.00"
                name='rewardAmount'
                // onChange={handleEarningChange}
              />
            </Form.Item>
          </InfoCard>
          <InfoCard label="HOW TO WIN" description="Winners are determined by">
            <Form.Item
              className="m-0"
              name="winningCriteria"
              // rules={[{ required: true, message: 'Enter prize money amount' }]}
            >
              <Select
                className="cursor-pointer"
                style={{ width: '100%' }}
                placeholder="Select winning criteria"
              >
                {Object.keys(winningCriteria).map((k) => (
                  <Option key={k} value={k}>
                    {winningCriteria[k]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </InfoCard>
          <ButtonComponent type="submit" text="Create gamified campaign" />
        </Form>
      </div>
    </DashboardLayout>
  )
}

export default NewGamifiedCampaign
