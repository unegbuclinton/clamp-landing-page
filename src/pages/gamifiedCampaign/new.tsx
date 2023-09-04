// gamification campaign flow
// -> import customer data
// -> create gamified campaign [campaign type that has leaderboard and winners]
// -> set reward frequency [award x {asset} every y {time period} to top z users]
// -> create underlying campaign that receives a trigger from the gamified campaign with position and user id.
//    the rule for the campaign is that it should award the user with the reward if property position is less than or equal to z

// -> when a trigger is sent the trigger service checks for leaderboardId and userId in the trigger payload and then sends the transaction data to the
// gamification service which then updates the leaderboard

// -> every interval of y, the gamification service sends a trigger to the campaign service with payload {leaderboardId, userId, position} for the top z users

import React, { ChangeEvent, useState } from 'react'
import { ruleInterface } from '@/utilities/types/createCampaign'
import { useRouter } from 'next/router'
import { Form, Input, InputNumber, Select } from 'antd'
import ButtonComponent from '@/components/atoms/button'
import InfoCard from '@/components/molecules/infoCard'
import DashboardLayout from '@/components/layouts/dashboardLayout'
const { Option } = Select
import { createNewCampaign } from '@/api/campaign'
import { createNewRule } from '@/api/rules'
import { createNewGame } from '@/api/game'
import { IDraftGame } from '@/backend/src/v1/gamificationAPI/interfaces/IGame'
interface NewGamifiedCampaignFormValues {
  campaignName: string
  roundsDuration: string
  numOfWinners: number
  rewardAmount: number
  winningCriteria: string
}
export type GameStatus = 'pending' | 'started' | 'paused' | 'stopped'

async function createUnderlyingCampaign(
  payload: NewGamifiedCampaignFormValues
) {
  const rule: ruleInterface = {
    id: '',
    assetId: 'cash--naira',
    assetQty: payload.rewardAmount,
    eventName: 'finalise_game_round',
    conditions: [
      {
        key: 'position',
        operator: 'lte',
        value: payload.numOfWinners,
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
    ruleIds: [ruleId, inGameRuleId],
    status: 'draft',
    redemptionRules: [],
  })
}

async function initNewGame(
  campaignId: string,
  numOfWinners: number,
  _roundsDuration: string
) {
  let roundsDuration = 60 * 60 * 24 * 7 // 'week'
  if (_roundsDuration === 'day') {
    roundsDuration = 60 * 60 * 24
  } else if (_roundsDuration === 'month') {
    roundsDuration = 60 * 60 * 24 * 30
  }
  const newGameDraft: IDraftGame = {
    campaignId,
    roundsDuration,
    numOfWinners,
    numOfRounds: 10, // get this from the campaign form later
  }
  return await createNewGame(newGameDraft)
}

const NewGamifiedCampaign = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  const handleSubmit = async (values: NewGamifiedCampaignFormValues) => {
    const { campaignId } = await createUnderlyingCampaign(values)
    const newGame = await initNewGame(
      campaignId,
      values.numOfWinners,
      values.roundsDuration
    )
    console.log({ campaignId }, 'gameId: ', newGame.id)
    router.push(`/loyaltyCampaign/campaign/${campaignId}`)
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    setSelectedFile(file || null)

    if (file) {
      uploadFile(file)
    }
  }

  const uploadFile = (file: File) => {
    const formData = new FormData()
    formData.append('csvFile', file)

    fetch(
      'https://clamp-service-g76glnnspa-ez.a.run.app/clamp-api/core/customerAccounts/upload',
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <DashboardLayout>
      <div className=' flex justify-center mb-6'>
        <div className='relative max-w-[462px] '>
          <div className='flex flex-col justify-center w-full'>
            <h3 className='text-xl font-bold w-full text-gray-700  mb-8'>
              Gamified Campaign
            </h3>
            <Form form={form} onFinish={handleSubmit} noValidate>
              <InfoCard description='Campaign name'>
                <Form.Item
                  name='campaignName'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your campaign name.',
                    },
                  ]}
                >
                  <Input
                    className='bg-transparent border-none shadow-none p-0 focus:border focus:border-black'
                    placeholder='E.g. Weekly top buyers'
                  />
                </Form.Item>
              </InfoCard>
              <InfoCard label='FREQUENCY' description={'Award prize(s) every'}>
                <Form.Item
                  name='roundsDuration'
                  rules={[
                    { required: true, message: 'Please select frequency.' },
                  ]}
                >
                  <Select
                    className='cursor-pointer'
                    style={{ width: '100%' }}
                    placeholder='Set frequency'
                  >
                    {['day', 'week', 'month'].map((value) => (
                      <Option key={value} value={value}>
                        {value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </InfoCard>
              <InfoCard label='WINNERS' description='After each round'>
                <div className='flex items-center'>
                  <Form.Item
                    className='m-0'
                    name='numOfWinners'
                    rules={[
                      {
                        required: true,
                        message: 'Set number of winners in each round',
                      },
                    ]}
                  >
                    <InputNumber
                      className='bg-transparent border-none shadow-none p-0 focus:border focus:border-black inline-block w-14 mr-1'
                      placeholder='10'
                      step={1}
                      min={1}
                      max={10}
                    />
                  </Form.Item>
                  <span> {'winner(s) will be selected'}</span>
                </div>
              </InfoCard>
              <InfoCard label='REWARD' description='Each winner earns'>
                <div className='flex'>
                  <span className='align-top leading-8 mr-1'>&#8358; </span>
                  <Form.Item
                    className='m-0'
                    name='rewardAmount'
                    rules={[
                      { required: true, message: 'Enter prize money amount' },
                    ]}
                  >
                    <InputNumber
                      className='bg-transparent border-none shadow-none p-0 focus:border focus:border-black inline-block w-60'
                      placeholder='100.00'
                      step={0.01}
                      min={0.01}
                    />
                  </Form.Item>
                </div>
              </InfoCard>
              <InfoCard
                label='HOW TO WIN'
                description='Winners are determined by'
              >
                <Form.Item
                  className='m-0'
                  name='winningCriteria'
                  rules={[
                    { required: true, message: 'Select winning criteria' },
                  ]}
                >
                  <Select
                    className='cursor-pointer'
                    style={{ width: '100%' }}
                    placeholder='Select winning criteria'
                  >
                    {Object.keys(winningCriteria).map((k) => (
                      <Option key={k} value={k}>
                        {winningCriteria[k]}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </InfoCard>
              <InfoCard
                label='ENROLL CUSTOMERS'
                description={'Upload list of customers'}
              >
                <div className='flex gap-3 mt-2'>
                  <div>
                    <label className='bg-transparent border-2 hover:bg-white/90 border-black text-black font-normal py-2 px-4 rounded cursor-pointer'>
                      <input
                        type='file'
                        accept='.csv'
                        onChange={handleFileChange}
                        className='file-input'
                      />
                      Choose CSV File
                    </label>
                  </div>
                  <div>
                    <label className='bg-dim-grey text-white font-normal pointer-events-none py-2 border-2 px-4 rounded cursor-pointer'>
                      <input
                        type='file'
                        accept='.csv'
                        disabled
                        onChange={handleFileChange}
                        className='file-input'
                      />
                      Connect via API
                    </label>
                  </div>
                </div>
              </InfoCard>
              <ButtonComponent type='submit' text='Create gamified campaign' />
            </Form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default NewGamifiedCampaign
