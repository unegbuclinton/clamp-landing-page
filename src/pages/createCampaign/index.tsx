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
  clearState,
  getCampaignData,
  getSpecificCampaign,
} from '@/utilities/redux/CampaignFormSlice'
import { useRouter } from 'next/router'
import {
  createCampaignInterface,
  ruleInterface,
} from '@/utilities/types/createCampaign'
import { createNewCampaign } from '@/api/campaign'
import { createRule, getRules } from '@/api/rules'
import { getSpecificRule } from '@/utilities/redux/RuleSlice'

const CampaignForm = () => {
  const router = useRouter()
  const { mode, campaignId } = router.query

  const {
    createCampaignData,
    redemptionType,
    ruleOperator,
    campaignEndDate,
    campaignStartDate,
  } = useAppSelector((state: RootState) => state.campaign)
  const dispatch = useAppDispatch()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [earningType, setEarningType] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [ruleId, setRuleId] = useState<string>('')

  useEffect(() => {
    // Check if there are saved form values in localStorage
    const savedFormValues = localStorage.getItem('formValues')
    if (savedFormValues) {
      const parsedFormValues = JSON.parse(savedFormValues)
      dispatch(getCampaignData(parsedFormValues))
    }
  }, [])
  const [form] = Form.useForm()

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

    const rulesData: ruleInterface = {
      id: id,
      assetId: 'ast-001',
      assetQty: createCampaignData.campaignEarnings,
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
          earningType === 'Fixed'
            ? 0
            : createCampaignData.campaignEarnings /
              createCampaignData.campaignTriggerValue,
      },
    }

    createRule(rulesData).then((data) => {
      if (data.id) {
        const ruleId = data.id
        getRules().then((data) => {
          const rules: Array<ruleInterface> = data
          if (rules) {
            const lastIndex = rules.length - 1
            const specificRule = rules[lastIndex]
            console.log(specificRule)
            dispatch(getSpecificRule(specificRule))
          }
        })
        const campaignData: createCampaignInterface = {
          id: id,
          name: createCampaignData.campaignName,
          startDate: campaignStartDate,
          endDate: campaignEndDate,
          status: 'active',
          ruleIds: [ruleId],
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
              liquidationInstrument: redemptionType.type,
              redeemableUntil: '2023-07-01',
              redeemableFrom: '2023-12-31',
            },
          ],
        }
        createNewCampaign(campaignData).then((data) => {
          if (data.id) {
            dispatch(getSpecificCampaign(data.id)).then((data) => {
              if (data.payload.ruleIds) {
                // dispatch(getSpecificRule(data.payload.ruleIds[0]))
              }
            })
            setLoading(false)
            localStorage.removeItem('formValues')
            dispatch(clearState())
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
