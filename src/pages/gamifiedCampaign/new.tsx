import React, { ChangeEvent, useEffect, useState } from 'react'
import { ruleInterface } from '@/utilities/types/createCampaign'
import { useRouter } from 'next/router'
import { Form, Input, InputNumber, Select, message } from 'antd'
import ButtonComponent from '@/components/atoms/button'
import InfoCard from '@/components/molecules/infoCard'
import DashboardLayout from '@/components/layouts/dashboardLayout'
const { Option } = Select
import { createNewCampaign,bulkEnrol } from '@/httpClient/campaign'
import { createNewRule } from '@/httpClient/rules'
import { initNewGame } from '@/httpClient/game'
import {importCustomerCSV } from '@/httpClient/customer'
import { IDraftGame } from '@/backend/src/v1/gamificationAPI/interfaces/IGame'
import { winningCriteria } from '@/backend/src/lib/game'


interface NewGamifiedCampaignFormValues {
  campaignName: string
  roundsDuration: string
  numOfWinners: number
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
    ruleIds: [inGameRuleId, ruleId],
    status: 'draft',
    redemptionRules: [],
  })
}

async function initiliazeGame(
  campaignId: string,
  numOfWinners: number,
  _roundsDuration: string,
  winningCriteria: string
) {
  let roundsDuration = 1000 * 60 * 60 * 24 * 7 // 'week'
  if (_roundsDuration === 'day') {
    roundsDuration = 1000 * 60 * 60 * 24
  } else if (_roundsDuration === 'month') {
    roundsDuration = 1000 * 60 * 60 * 24 * 30
  }
  const newGameDraft: IDraftGame = {
    campaignId,
    roundsDuration,
    numOfWinners,
    numOfRounds: 10, // get this from the campaign form later
    winningCriteriaCode: winningCriteria,
  }
  return await initNewGame(newGameDraft)
}

const NewGamifiedCampaign = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const [importOpId, setImportOpId] = useState('')
  const [newCampaignId, setNewCampaignId] = useState('')
  const handleSubmit = async (values: NewGamifiedCampaignFormValues) => {
    const { campaignId } = await createUnderlyingCampaign(values)
    setNewCampaignId(campaignId)
    const newGame = await initiliazeGame(
      campaignId,
      values.numOfWinners,
      values.roundsDuration,
      values.winningCriteria
    )
    console.log({ campaignId }, 'gameId: ', newGame.id)
    router.push(`/loyaltyCampaign/campaign/${campaignId}`)
  }
  const handleFileChange = async(e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      const {importOperationId} = await importCustomerCSV(file)
      setImportOpId(importOperationId)
    }
  }
  useEffect(()=>{
    if (!importOpId || !newCampaignId) return
    bulkEnrol(importOpId, newCampaignId).then(({enrolledCount}:{enrolledCount:number})=>{
      message.success(`${enrolledCount} customers enrolled successully`)
    })
  },[importOpId, newCampaignId])

  
  return (
    <DashboardLayout>
      <div className=" flex justify-center mb-6">
        <div className="relative max-w-[462px] ">
          <div className="flex flex-col justify-center w-full">
            <h3 className="text-xl font-bold w-full text-gray-700  mb-8">Gamified Campaign</h3>
            <Form form={form} onFinish={handleSubmit} noValidate>
              <InfoCard description="Campaign name">
                <Form.Item
                  name="campaignName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your campaign name.',
                    },
                  ]}
                >
                  <Input
                    className="bg-transparent border-none shadow-none p-0 focus:border focus:border-black"
                    placeholder="E.g. Weekly top buyers"
                  />
                </Form.Item>
              </InfoCard>
              <InfoCard label="FREQUENCY" description={'Award prize(s) every'}>
                <Form.Item
                  name="roundsDuration"
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
                    name="numOfWinners"
                    rules={[
                      {
                        required: true,
                        message: 'Set number of winners in each round',
                      },
                    ]}
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
              <InfoCard label="ENROLL CUSTOMERS" description={'Upload list of customers'}>
                <div className="flex gap-3 mt-2">
                  <div>
                    <label className="bg-transparent border-2 hover:bg-white/90 border-black text-black font-normal py-2 px-4 rounded cursor-pointer">
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="file-input"
                      />
                      Choose CSV File
                    </label>
                  </div>
                  <div>
                    <label className="bg-dim-grey text-white font-normal pointer-events-none py-2 border-2 px-4 rounded cursor-pointer">
                      <input
                        type="file"
                        accept=".csv"
                        disabled
                        onChange={handleFileChange}
                        className="file-input"
                      />
                      Connect via API
                    </label>
                  </div>
                </div>
              </InfoCard>
              <ButtonComponent type="submit" text="Create gamified campaign" />
            </Form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default NewGamifiedCampaign
