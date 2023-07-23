import ButtonComponent from '@/components/atoms/button'
import DashboardLayout from '@/components/layouts/dashboardLayout'
import React, { useEffect, useState } from 'react'
import CreateCampaignTwo from './createCampaignSteps/CreateCampaignTwo'
import CreateCampaignOne from './createCampaignSteps/CreateCampaignOne'
import CreateCampaignSummary from './createCampaignSummary'
import { Form } from 'antd'
import { RootState } from '@/store'
import { useAppDispatch, useAppSelector } from '@/utilities/hooks'
import {
  getCampaignData,
  getSpecificCampaign,
} from '@/utilities/redux/CampaignFormSlice'
import { useRouter } from 'next/router'

import {
  createCampaignInterface,
  ruleInterface,
} from '@/utilities/types/createCampaign'
import { createNewCampaign } from '@/api/campaign'
import { createRule } from '@/api/rules'
import { getSpecificRule } from '@/utilities/redux/RuleSlice'

const CampaignForm = () => {
  const router = useRouter()
  const { createCampaignData, redemptionType, ruleOperator } = useAppSelector(
    (state: RootState) => state.campaign
  )
  const dispatch = useAppDispatch()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [earningType, setEarningType] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

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

  const handleEarningType = (value: string) => {
    setEarningType(value)
  }

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
          handleEarningType={handleEarningType}
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

  const handleFinish = () => {
    setLoading(true)
    const id = String(Math.random())
    const campaignData: createCampaignInterface = {
      id: id,
      name: createCampaignData.campaignName,
      startDate: startDate,
      endDate: endDate,
      status: 'active',
      ruleIds: [id],
      redemptionRules: [
        {
          assetConditions: [
            {
              key: 'point',
              operator: 'gte',
              value: String(createCampaignData.campaignRedeem),
            },
          ],
          customerConditions: [
            {
              key: 'membership',
              operator: 'eq',
              value: 'preminum',
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
      assetId: 'ast-001',
      assetQty: createCampaignData.campaignReward,
      eventName: createCampaignData.campaignName,
      conditions: [
        {
          key: createCampaignData.campaignTrigger,
          operator: ruleOperator.operator,
          value: String(createCampaignData.campaignTriggerValue),
        },
      ],
      multiplier: {
        key: createCampaignData.campaignTrigger,
        multiple:
          earningType === 'flat'
            ? 0
            : createCampaignData.campaignEarnings /
              createCampaignData.campaignTriggerValue,
      },
    }

    createRule(rulesData).then((data) => {
      if (data.id) {
        createNewCampaign(campaignData).then((data) => {
          if (data.id) {
            dispatch(getSpecificCampaign(data.id)).then((data) => {
              if (data.payload.ruleIds) {
                // dispatch(getSpecificRule(data.payload.ruleIds[0]))
              }
            })
            setLoading(false)
            router.push(`/loyaltyCampaign/campaign/${data.id}`)
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
                    loading={loading}
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
