import PillButton from '@/components/atoms/pillButton'
import InfoCard from '@/components/molecules/infoCard'
import { campaignOptions } from '@/utilities/data/campaignOption'
import type { DatePickerProps } from 'antd'
import { Form, Input, Select } from 'antd'
import React, { useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { FormInstance } from 'antd/lib/form'
import { DatePicker, Space } from 'antd'
import {
  earningTypeOptions,
  triggerOptions,
} from '@/utilities/data/triggerOptions'
import { useDispatch } from 'react-redux'
import {
  getRedemptiontype,
  getRuleOperator,
} from '@/utilities/redux/CampaignFormSlice'
import { RootState } from '@/store'
import { useAppSelector } from '@/utilities/hooks'

interface campaignStepTwo {
  form: FormInstance
  formData: {
    campaignName: string
    campaignTriggerValue: number
    campaignEarnings: number
    campaignRedeem: number
    campaignStartDate: string
    campaignEndDate: string
    campaignTrigger: string
    campaignReward: number
  }
  handleDateSelection: (x: string, y: string) => void
  handleEarningType: (x: string) => void
}

const CreateCampaignTwo: React.FC<campaignStepTwo> = ({
  handleDateSelection,
  handleEarningType,
}) => {
  const { Option } = Select
  const [rewardType, setRewardType] = useState<number>(0)
  // const [selectedOption, setSelectedOption] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const dispatch = useDispatch()
  const { ruleOperator } = useAppSelector((state: RootState) => state.campaign)

  const handleChange = (value: any) => {
    // setSelectedOption(value)
    const selectedOperator = triggerOptions.find(
      (option) => option.value === value
    )
    if (selectedOperator) {
      dispatch(
        getRuleOperator({
          operator: selectedOperator?.operator,
          value: selectedOperator.value,
        })
      )
    }
  }

  const handleStartDate: DatePickerProps['onChange'] = (date, dateString) => {
    setStartDate(dateString)
    handleDateSelection(dateString, endDate)
  }

  const handleEndDate: DatePickerProps['onChange'] = (date, dateString) => {
    setEndDate(dateString)
    handleDateSelection(startDate, dateString)
  }

  const handleTypeOfEarning = (value: string) => {
    handleEarningType(value)
  }
  return (
    <div className='flex justify-center w-full '>
      <div>
        <p className='text-xs text-dim-grey mb-4'>Step 1 of 2</p>
        <h1 className='text-lg font-semibold mb-5'>Set campaign rules </h1>
        <InfoCard label='CONDITION'>
          <Form.Item name='campaignTrigger'>
            <Select
              className='cursor-pointer'
              style={{ width: '100%' }}
              placeholder='Select condition'
              onChange={handleChange}
            >
              {triggerOptions?.map((options, idx) => (
                <Option key={idx} value={options.value}>
                  {options.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className='flex items-center mt-2'>
            <Form.Item
              className='m-0'
              name='campaignTriggerValue'
              rules={[{ required: true, message: 'Add trigger point!' }]}
            >
              <Input
                className='shadow-lg w-[60px] h-[32px] text-right mr-2'
                placeholder='1'
              />
            </Form.Item>

            {ruleOperator.value === 'Price' && <span>Dollar</span>}
            {ruleOperator.value === 'Location' && <span>Location</span>}
            {ruleOperator.value === 'Frequency' && <span>Times</span>}
          </div>
        </InfoCard>

        {/* Reward */}

        <InfoCard label='REWARD' description='Customer earns'>
          <div className='flex items-center mb-5'>
            <Form.Item
              className='m-0'
              name='campaignEarnings'
              rules={[{ required: true, message: 'Add customer earnings!' }]}
            >
              <Input
                className='shadow-lg w-[60px] h-[32px] text-right mr-2'
                placeholder='1'
              />
            </Form.Item>
            <span>Points</span>
          </div>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            label='Earning type'
            className='font-bold text-sm'
            name={'earningType'}
          >
            <Select
              className='cursor-pointer'
              style={{ width: '30%' }}
              placeholder='Earning Type'
              onChange={handleTypeOfEarning}
            >
              {earningTypeOptions?.map((options, idx) => (
                <Option key={idx} value={options.value}>
                  {options.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </InfoCard>

        {/* Redemption */}

        <InfoCard
          label='REDEMPTION'
          description='Points needed to redeemed reward'
        >
          <div className='flex items-center'>
            <Form.Item
              className='m-0'
              rules={[{ required: true, message: 'Add points for redeeming!' }]}
              name='campaignRedeem'
            >
              <Input
                className='shadow-lg w-[60px] h-[32px] text-right mr-2'
                placeholder='1'
              />
            </Form.Item>
            <span>Points</span>
          </div>
          <div>
            <p className='font-medium py-4'>Reward</p>
            <div className='flex gap-2'>
              {campaignOptions?.map(({ text, type }, idx) => (
                <PillButton
                  onClick={() => {
                    dispatch(getRedemptiontype(type))
                    setRewardType(idx)
                  }}
                  outline={rewardType === idx ? false : true}
                  text={text}
                  key={idx}
                  icon={rewardType === idx ? <AiFillCheckCircle /> : ''}
                />
              ))}
            </div>
          </div>

          {rewardType === 0 || rewardType === 1 ? (
            <div>
              <p className='font-medium py-4'>
                {rewardType === 0 && 'Cashback amount'}
                {rewardType === 1 && 'Discount'}
              </p>

              <div className='flex'>
                <Form.Item
                  rules={[{ required: true, message: 'Add cash back!' }]}
                  name='campaignReward'
                >
                  <Input
                    className='shadow-lg w-[60px] h-[32px] text-right mr-2'
                    placeholder='5'
                  />
                </Form.Item>
                <p className='pt-1'>
                  {rewardType === 0 && 'Dollar'}
                  {rewardType === 1 && '%'}
                </p>
              </div>
            </div>
          ) : null}
          {/* 
          <p className='py-4 text-dim-grey'>
            Customer needs to spend at least $35 to earn this reward
          </p> */}
        </InfoCard>
        <InfoCard label='CAMPAIGN DURATION'>
          <div className='flex gap-2'>
            <div className='flex-1'>
              <p className='text-dim-grey'>Start Date</p>
              <DatePicker onChange={handleStartDate} className='w-full' />
            </div>

            <div className='flex-1'>
              <p className='text-dim-grey'>End Date</p>
              <DatePicker onChange={handleEndDate} className='w-full' />
            </div>
          </div>
        </InfoCard>
      </div>
    </div>
  )
}

export default CreateCampaignTwo
