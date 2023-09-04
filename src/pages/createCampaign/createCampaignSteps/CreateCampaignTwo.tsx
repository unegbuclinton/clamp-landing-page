import PillButton from '@/components/atoms/pillButton'
import InfoCard from '@/components/molecules/infoCard'
import { campaignOptions } from '@/utilities/data/campaignOption'
import type { DatePickerProps } from 'antd'
import { Button, Form, Input, InputNumber, Select } from 'antd'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { FormInstance } from 'antd/lib/form'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import {
  earningTypeOptions,
  triggerOptions,
} from '@/utilities/data/triggerOptions'
import { useDispatch } from 'react-redux'
import {
  getRedemptiontype,
  getRuleOperator,
  setCampaignEndDate,
  setCampaignStartDate,
} from '@/utilities/redux/CampaignFormSlice'
import { RootState } from '@/store'
import { useAppSelector } from '@/utilities/hooks'

interface campaignStepTwo {
  form: FormInstance
  formData: {
    campaignTriggerValue: any
    campaignEarnings: number
    campaignRedeem: number
    cashbackOption: string
    campaignTrigger: string
    campaignReward: number
  }
  initialRewardValue: string
  handleEarningType: (x: string) => void
}

const CreateCampaignTwo: React.FC<campaignStepTwo> = ({
  handleEarningType,
  initialRewardValue,
}) => {
  const { Option } = Select
  const { ruleOperator, redemptionType, campaignEndDate, campaignStartDate } =
    useAppSelector((state: RootState) => state.campaign)

  const startDateObject = dayjs(campaignStartDate)
  const EndDateObject = dayjs(campaignEndDate)
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [rewardValue, setRewardValue] = useState<any>(initialRewardValue)
  const [errorMessage, setErrorMessage] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const dispatch = useDispatch()

  const handleEarningChange = (value: number | null) => {
    setRewardValue(value)
  }

  const handleChange = (value: any) => {
    setSelectedOption(value)
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
    dispatch(setCampaignStartDate(dateString))
  }

  const handleEndDate: DatePickerProps['onChange'] = (date, dateString) => {
    dispatch(setCampaignEndDate(dateString))
  }

  const handleTypeOfEarning = (value: string) => {
    handleEarningType(value)
  }

  const handleRedemption = (value: number | null) => {
    if (value && value >= rewardValue) {
      setErrorMessage(false)
    } else {
      setErrorMessage(true)
    }
  }

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
    <div className='flex justify-center w-full '>
      <div>
        <p className='text-xs text-dim-grey mb-4'>Step 1 of 2</p>
        <h1 className='text-lg font-semibold mb-5'>Set campaign rules </h1>
        <InfoCard label='CONDITION' description={'If'}>
          <Form.Item name='campaignTrigger'>
            <Select
              className='cursor-pointer'
              style={{ width: '100%' }}
              placeholder='Select condition'
              onChange={handleChange}
            >
              {triggerOptions?.map((options, idx) => (
                <Option
                  key={idx}
                  value={options.value}
                  disabled={options.disabled}
                >
                  {options.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className='flex items-center mt-2'>
            <Form.Item
              className='m-0'
              name='campaignTriggerValue'
              rules={[{ required: true, message: '' }]}
            >
              {selectedOption === 'Location' && (
                <Input
                  type='text'
                  className='shadow-lg w-[100px] h-[32px] text-right mr-2'
                  placeholder='Location'
                />
              )}
              {selectedOption !== 'Location' && (
                <InputNumber
                  className='shadow-lg w-[100px] h-[32px] text-right mr-2'
                  placeholder='1'
                />
              )}
            </Form.Item>

            {ruleOperator.value === 'Price' && <span>Naira</span>}
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
              rules={[{ required: true, message: '' }]}
            >
              <InputNumber
                className='shadow-lg w-[60px] h-[32px] text-right mr-2'
                placeholder='1'
                onChange={handleEarningChange}
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
              {selectedOption === 'Location' &&
                [{ label: 'Fixed', value: 'Fixed' }]?.map((options, idx) => (
                  <Option key={idx} value={options.value}>
                    {options.label}
                  </Option>
                ))}
              {selectedOption !== 'Location' &&
                earningTypeOptions?.map((options, idx) => (
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
              rules={[
                {
                  required: true,
                  message: '',
                },
              ]}
              name='campaignRedeem'
            >
              <InputNumber
                min={rewardValue}
                type='number'
                className='shadow-lg w-[60px] h-[32px] text-right mr-2'
                placeholder='1'
                onChange={handleRedemption}
              />
            </Form.Item>
            <span className=''>Points</span>
          </div>
          {errorMessage && (
            <p className='text-red-700'>
              Value should be greater than reward point
            </p>
          )}
          <div>
            <p className='font-medium py-4'>Reward</p>
            <div className='flex gap-2'>
              {campaignOptions?.map(({ text, type, status }, idx) => (
                <PillButton
                  onClick={() => {
                    dispatch(getRedemptiontype({ type: type, id: idx }))
                  }}
                  disabled={status}
                  outline={redemptionType.id === idx ? false : true}
                  text={text}
                  key={idx}
                  icon={redemptionType.id === idx ? <AiFillCheckCircle /> : ''}
                />
              ))}
            </div>
          </div>

          {redemptionType.id === 0 || redemptionType.id === 1 ? (
            <div>
              <p className='font-medium py-4'>
                {redemptionType.id === 0 && 'Cashback'}
                {redemptionType.id === 1 && 'Discount'}
              </p>

              <div className='flex items-start'>
                <Form.Item
                  rules={[{ required: true, message: '' }]}
                  name='campaignReward'
                >
                  <InputNumber
                    className='shadow-lg w-[60px] h-[32px] text-right mr-2'
                    placeholder='5'
                  />
                </Form.Item>
                {redemptionType.id === 0 && (
                  <Form.Item style={{ width: '100%' }} name={'cashbackOption'}>
                    <Select
                      className='cursor-pointer'
                      style={{ width: '30%' }}
                      placeholder='Options'
                    >
                      {[
                        { label: 'Naira', value: 'Naira' },
                        { label: 'Percentage', value: 'Percentage' },
                      ]?.map((options, idx) => (
                        <Option key={idx} value={options.value}>
                          {options.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
                {redemptionType.id === 1 && <p className='pt-1'>%</p>}
              </div>
            </div>
          ) : null}

          {redemptionType.id === 2 && (
            <div>
              <p className='font-medium py-4'>Perks</p>

              <Form.Item name={'campaignPerks'}>
                <Select
                  className='cursor-pointer'
                  style={{ width: 200 }}
                  placeholder='Select Perk'
                >
                  <Option value='jack'>Perk1</Option>
                  <Option value='lucy'>Perk2</Option>
                  <Option value='tom'>Perk3</Option>
                </Select>
              </Form.Item>
            </div>
          )}
          {/* 
          <p className='py-4 text-dim-grey'>
            Customer needs to spend at least $35 to earn this reward
          </p> */}
        </InfoCard>
        <InfoCard label='CAMPAIGN DURATION'>
          <div className='flex gap-2'>
            <div className='flex-1'>
              <p className='text-dim-grey'>Start Date</p>
              <DatePicker
                defaultValue={startDateObject}
                onChange={handleStartDate}
                // format='DD-MM-YYYY'
                className='w-full'
              />
            </div>

            <div className='flex-1'>
              <p className='text-dim-grey'>End Date</p>
              <DatePicker
                defaultValue={EndDateObject}
                onChange={handleEndDate}
                // format='DD-MM-YYYY'
                className='w-full'
              />
            </div>
          </div>
        </InfoCard>
        <InfoCard
          label='ENROLL CUSTOMERS'
          description={'Upload a CSV file with customers'}
        >
          <div>
            <label className='bg-black hover:bg-black/80 text-white font-bold py-2 px-4 rounded cursor-pointer'>
              <input
                type='file'
                accept='.csv'
                onChange={handleFileChange}
                className='file-input'
              />
              Choose CSV File
            </label>
          </div>
        </InfoCard>
      </div>
    </div>
  )
}

export default CreateCampaignTwo
