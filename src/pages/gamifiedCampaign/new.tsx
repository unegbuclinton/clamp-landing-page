// gamification campaign flow
// -> import customer data
// -> create gamified campaign [campaign type that has leaderboard and winners]
// -> set reward frequency [award x {asset} every y {time period} to top z users]
// -> create underlying campaign that receives a trigger from the gamified campaign with position and user id.
//    the rule for the campaign is that it should award the user with the reward if property position is less than or equal to z

// -> when a trigger is sent the trigger service checks for leaderboardId and userId in the trigger payload and then sends the transaction data to the
// gamification service which then updates the leaderboard

// -> every interval of y, the gamification service sends a trigger to the campaign service with payload {leaderboardId, userId, position} for the top z users

import React from 'react'
import { ruleInterface } from '@/utilities/types/createCampaign'
import { useRouter } from 'next/router'
import { Form, Input, InputNumber, Select } from 'antd'
import ButtonComponent from '@/components/atoms/button'
import InfoCard from '@/components/molecules/infoCard'
import DashboardLayout from '@/components/layouts/dashboardLayout'
const { Option } = Select
import { createNewCampaign } from '@/api/campaign'
import { createNewRule } from '@/api/rules'
interface NewGamifiedCampaignFormValues {
  campaignName: string
  rewardFrequency: string
  winnerQuota: number
  rewardAmount: number
  winningCriteria: string
}

async function createUnderlyingCampaign(payload: NewGamifiedCampaignFormValues) {
  const rule: ruleInterface = {
    id: '',
    assetId: 'cash--naira',
    assetQty: payload.rewardAmount,
    eventName: 'finalise_game_round',
    conditions: [
      {
        key: 'position',
        operator: 'lte',
        value: payload.winnerQuota,
      },
    ],
  }
  const inGameRule: ruleInterface = {
    id: '',
    assetId: 'cash--naira',
    assetQty: 0,
    eventName: 'pos_transaction',
    conditions: [],
    scoreKey: 'transaction_amount',

  }
  const { id: ruleId } = await createNewRule(rule)
  const { id: inGameRuleId } = await createNewRule(inGameRule)
  console.log({ ruleId, inGameRuleId })
  return await createNewCampaign({
    id: '',
    name: payload.campaignName,
    startDate: new Date().toISOString(), // add 90 days by default
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60000).toISOString(),
    ruleIds: [ruleId],
    status: 'draft',
    redemptionRules: [],
  })
}

const NewGamifiedCampaign = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  const handleSubmit = async (values: NewGamifiedCampaignFormValues) => {
    console.log(values)
    console.log('Received values:', form.getFieldsValue())
    const { id: campaignId } = await createUnderlyingCampaign(values)
    console.log({ campaignId })
    router.push(`/gamifiedCampaign/${campaignId}`)
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
            <div className="flex items-center">
              <Form.Item
                className="m-0"
                name="winnerQuota"
                rules={[{ required: true, message: 'Set number of winners in each round' }]}
              >
                <InputNumber
                  className="bg-transparent border-none shadow-none p-0 focus:border focus:border-black inline-block w-14 mr-1"
                  placeholder="10"
                  step={1}
                  min={1}
                  max={10}
                />
              </Form.Item>
              <span> {'winner(s) will be selected'}</span>
            </div>
          </InfoCard>
          <InfoCard label="REWARD" description="Each winner earns">
            <div className="flex">
              <span className="align-top leading-8 mr-1">&#8358; </span>
              <Form.Item
                className="m-0"
                name="rewardAmount"
                rules={[{ required: true, message: 'Enter prize money amount' }]}
              >
                <InputNumber
                  className="bg-transparent border-none shadow-none p-0 focus:border focus:border-black inline-block w-60"
                  placeholder="100.00"
                  step={0.01}
                  min={0.01}
                />
              </Form.Item>
            </div>
          </InfoCard>
          <InfoCard label="HOW TO WIN" description="Winners are determined by">
            <Form.Item
              className="m-0"
              name="winningCriteria"
              rules={[{ required: true, message: 'Select winning criteria' }]}
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
