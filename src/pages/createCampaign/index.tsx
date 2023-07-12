import ButtonComponent from '@/components/atoms/button'
import DashboardLayout from '@/components/layouts/dashboardLayout'
import React, { useEffect, useState } from 'react'
import CreateCampaignTwo from './createCampaignSteps/CreateCampaignTwo'
import CreateCampaignOne from './createCampaignSteps/CreateCampaignOne'
import CreateCampaignSummary from './createCampaignSummary'
import { Form } from 'antd'
import { useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { useAppSelector } from '@/utilities/hooks'
import { getCampaignData } from '@/utilities/redux/CampaignFormSlice'
import { CampaignInterface } from '@/utilities/types'
import {
  assetsInterface,
  createCampaignInterface,
  ruleInterface,
  triggerInterface,
} from '@/utilities/types/createCampaign'
import {
  createAssets,
  createNewCampaign,
  createRule,
  createTrigger,
} from '@/api/campaign'

const CampaignForm = () => {
  const { createCampaignData, redemptionType } = useAppSelector(
    (state: RootState) => state.campign
  )
  const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  useEffect(() => {
    // Check if there are saved form values in localStorage
    const savedFormValues = localStorage.getItem('formValues')
    if (savedFormValues) {
      const parsedFormValues = JSON.parse(savedFormValues)
      dispatch(getCampaignData(parsedFormValues))
    }
  }, [])
  const [form] = Form.useForm()
  const handleDateSelection = (startDate: string, endDate: string) => {
    setStartDate(startDate)
    setEndDate(endDate)
  }

  const currentDate = new Date().toISOString().split('T')[0]
  const steps = [
    {
      component: (
        <CreateCampaignOne form={form} formData={createCampaignData} />
      ),
    },
    {
      component: (
        <CreateCampaignTwo
          form={form}
          formData={createCampaignData}
          handleDateSelection={handleDateSelection}
        />
      ),
    },
    {
      component: <CreateCampaignSummary />,
    },
  ]

  const handleStepForward = () => {
    form.validateFields().then((values) => {
      const updatedFormData = { ...createCampaignData, ...values }
      dispatch(getCampaignData(updatedFormData))
      setCurrentStep((prev) => prev + 1)
      localStorage.setItem('formValues', JSON.stringify(updatedFormData))
    })
  }
  const handleStepBack = () => {
    setCurrentStep((prev) => prev - 1)
  }
  const id = 'bhyu5f'
  const handleFinish = () => {
    const campaignData: createCampaignInterface = {
      id: id,
      name: createCampaignData.campaignName,
      startDate: startDate,
      endDate: endDate,
      status: 'active',
      ruleIds: [''],
      redemptionRules: [
        {
          assetConditions: [
            {
              key: 'point',
              operator: 'gt',
              value: String(createCampaignData.campaignRedeem),
            },
          ],
          customerConditions: [
            {
              key: 'price',
              operator: 'gt',
              value: '10',
            },
          ],
          liquidationInstrument: redemptionType,
          redeemableUntil: '2023-07-01',
          redeemableFrom: '2023-12-31',
        },
      ],
    }
    const rulesData: ruleInterface = {
      id: id,
      assetId: createCampaignData.campaignName,
      assetQty: 2,
      eventName: createCampaignData.campaignName,
      conditions: [
        {
          key: createCampaignData.campaignTrigger,
          operator: 'gt',
          value: String(createCampaignData.campaignReward),
        },
      ],
      multiplier: {
        key: 'sre',
        multiple: 2,
      },
    }
    const trigger: triggerInterface = {
      id: id,
      eventName: 'purchase',
      customerId: 'dde55',
      payload: {
        product_id: '',
        quantity: 2,
      },
      status: 'pending',
    }
    const assetData: assetsInterface = {
      id: id,
      name: createCampaignData.campaignName,
      category: 'eee',
      type: 'eee',
      tags: [''],
      value: '100',
      monetaryValue: '100',
      currency: 'USD',
      pointValue: String(createCampaignData.campaignEarnings),
      data: '',
      status: 'active',
    }

    createRule(rulesData).then((data) => {
      if (data) {
        createNewCampaign(campaignData).then((data) => {
          if (data) {
            createTrigger(trigger).then((data) => {
              if (data) {
                createAssets(assetData)
              }
            })
          }
        })
      }
    })
  }
  return (
    <DashboardLayout>
      <Form
        initialValues={createCampaignData}
        form={form}
        onFinish={handleFinish}
      >
        <div className=' flex justify-center mb-6'>
          <div className='relative max-w-[462px] '>
            <h1 className='text-2xl font-semibold mb-8'>
              Create Rewards Campaign
            </h1>
            {steps[currentStep].component}
            {currentStep <= 0 && (
              <div>
                <ButtonComponent
                  onClick={handleStepForward}
                  type='button'
                  text='Continue'
                  className=' w-full '
                />
              </div>
            )}
            {currentStep > 0 && (
              <div className='flex gap-2'>
                <ButtonComponent
                  onClick={handleStepBack}
                  type='button'
                  text='Back'
                  outline
                  className=' w-full '
                />
                {currentStep < 2 && (
                  <ButtonComponent
                    onClick={handleStepForward}
                    type='button'
                    text='Continue'
                    className=' w-full '
                  />
                )}
                {currentStep === 2 && (
                  <ButtonComponent
                    type='submit'
                    text='Submit'
                    className=' w-full '
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </Form>
    </DashboardLayout>
  )
}

export default CampaignForm
