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
  createCampaign,
  getCampaignData,
  setCampaignEndDate,
  setCampaignStartDate,
  updateSpecificCampaign,
} from '@/utilities/redux/CampaignFormSlice'
import { useRouter } from 'next/router'
import { createCampaignInterface, ruleInterface } from '@/utilities/types/createCampaign'

import { getRules } from '@/api/rules'
import { createRule, getSpecificRule, updateSpecificRule } from '@/utilities/redux/RuleSlice'
import LoadingStateComponent from '@/components/molecules/LoadingState'
import Link from 'next/link'

const CampaignForm = () => {
  const router = useRouter()
  const { mode, campaignId } = router.query

  const {
    createCampaignData,
    specificCampaign,
    redemptionType,
    ruleOperator,
    campaignEndDate,
    campaignStartDate,
  } = useAppSelector((state: RootState) => state.campaign)
  const { specificRule } = useAppSelector((state: RootState) => state.rule)
  const dispatch = useAppDispatch()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [earningType, setEarningType] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [dataFetching, setDataFetching] = useState<any>(true)

  useEffect(() => {
    if (mode === 'edit') {
      localStorage.removeItem('formValues')
      const data = {
        campaignName: specificCampaign?.name,
        earningType: 'Fixed',
        campaignTriggerValue: specificRule?.conditions?.[0]?.value,
        campaignEarnings: specificRule?.assetQty,
        campaignRedeem: specificCampaign.redemptionRules[0]?.assetConditions[0]?.value,
        campaignTrigger: specificRule?.conditions[0]?.key,
        cashbackOption: 'percentage',
        campaignReward: 10,
      }
      dispatch(getCampaignData(data))
      dispatch(setCampaignStartDate(specificCampaign.startDate))
      dispatch(setCampaignEndDate(specificCampaign.endDate))
    }
  }, [mode])

  useEffect(() => {
    if (mode === 'edit') {
      const timeoutId = setTimeout(() => {
        setDataFetching(false)
      }, 1000)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  useEffect(() => {
    setDataFetching(false)
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
      component: <CreateCampaignOne form={form} formData={createCampaignData} />,
    },
    {
      component: (
        <CreateCampaignTwo
          initialRewardValue={String(specificRule?.assetQty)}
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

  const handleFinish = async () => {
    try {
      setLoading(true)
      const id = String(Math.random())

      const rulesData: ruleInterface = {
        assetId: 'ast-001',
        id: '',
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
            earningType === 'recurring'
              ? createCampaignData.campaignEarnings / createCampaignData.campaignTriggerValue
              : 0,
        },
      }

      const ruleId = (
        await (mode === 'edit'
          ? dispatch(updateSpecificRule({ body: rulesData, id: specificRule.id }))
          : dispatch(createRule(rulesData)))
      ).payload.id

      if (ruleId) {
        const rules = await getRules()
        const specificRule = rules[rules.length - 1]
        dispatch(getSpecificRule(specificRule))
        const campaignData: createCampaignInterface = {
          id,
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
                  value: 'premium',
                },
              ],
              liquidationInstrument: redemptionType.type,
              redeemableUntil: '2023-07-01',
              redeemableFrom: '2023-12-31',
            },
          ],
        }

        const campaign = await (mode === 'edit'
          ? dispatch(
              updateSpecificCampaign({
                body: campaignData,
                id: specificCampaign.id,
              })
            )
          : dispatch(createCampaign(campaignData)))

        if (campaign.payload.id) {
          setLoading(false)
          localStorage.removeItem('formValues')
          dispatch(clearState())
          router.push(`/loyaltyCampaign/campaign/${campaign.payload.id}`)
        }
      }
    } catch (error) {
      // Handle errors here
      setLoading(false)
      console.error(error)
    }
  }

  if (dataFetching) {
    return <LoadingStateComponent />
  }

  return (
    <DashboardLayout>
      <Form initialValues={createCampaignData} form={form} onFinish={handleFinish}>
        <div className=" flex justify-center mb-6">
          <div className="relative max-w-[462px] ">
            <h1 className="text-2xl font-semibold mb-2">
              {`${campaignId ? 'Edit Reward Campaign' : 'Create Rewards Campaign'}`}
            </h1>
            <p className="text-xs  text-gray-500">
              <Link href="/gamifiedCampaign/new" className="underline">
                Click here{' '}
              </Link>
              to create gamified campaign if your campaign has winner(s) and/or recurring rounds.
            </p>
            {steps[currentStep].component}
            {currentStep <= 0 && (
              <div>
                <ButtonComponent
                  onClick={handleStepForward}
                  type="button"
                  text="Continue"
                  className=" w-full "
                />
              </div>
            )}
            {currentStep > 0 && (
              <div className="flex gap-2">
                <ButtonComponent
                  onClick={handleStepBack}
                  type="button"
                  text="Back"
                  outline
                  className=" w-full "
                />
                {currentStep < 2 && (
                  <ButtonComponent
                    onClick={handleStepForward}
                    type="button"
                    text="Continue"
                    className=" w-full "
                  />
                )}
                {currentStep === 2 && (
                  <ButtonComponent
                    type="submit"
                    loading={loading}
                    text={`${mode === 'edit' ? 'Update' : 'Submit'}`}
                    className=" w-full "
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
