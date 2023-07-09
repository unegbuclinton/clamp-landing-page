import ButtonComponent from '@/components/atoms/button';
import DashboardLayout from '@/components/layouts/dashboardLayout';
import React, { useEffect, useState } from 'react';
import CreateCampaignTwo from './createCampaignSteps/CreateCampaignTwo';
import CreateCampaignOne from './createCampaignSteps/CreateCampaignOne';
import CreateCampaignSummary from './createCampaignSummary';
import { Form } from 'antd';
import { useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { useAppSelector } from '@/utilities/hooks';
import { getCampaignData } from '@/utilities/redux/CampaignFormSlice';
import { CampaignInterface } from '@/utilities/types';

const CampaignForm = () => {
  const { createCampaignData } = useAppSelector(
    (state: RootState) => state.campign
  );
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if there are saved form values in localStorage
    const savedFormValues = localStorage.getItem('formValues');
    if (savedFormValues) {
      const parsedFormValues = JSON.parse(savedFormValues);
      dispatch(getCampaignData(parsedFormValues));
    }
  }, []);
  const [form] = Form.useForm();

  const steps = [
    {
      component: (
        <CreateCampaignOne form={form} formData={createCampaignData} />
      ),
    },
    {
      component: (
        <CreateCampaignTwo form={form} formData={createCampaignData} />
      ),
    },
    {
      component: <CreateCampaignSummary />,
    },
  ];

  const handleStepForward = () => {
    form.validateFields().then((values) => {
      const updatedFormData = { ...createCampaignData, ...values };
      dispatch(getCampaignData(updatedFormData));
      setCurrentStep((prev) => prev + 1);
      localStorage.setItem('formValues', JSON.stringify(updatedFormData));
    });
  };
  const handleStepBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const handleFinish = () => {
    const data: CampaignInterface = {
      id: '',
      startDate: '',
      endDate: '',
      name: createCampaignData.campaignName,
      rules: [
        {
          id: '',
          asset: {
            id: '',
            name: '',
            category: '',
            type: '',
            tags: [''],
            value: '',
            monetaryValue: '',
            currency: '',
            pointValue: '',
            data: '',
            status: 'active',
            createdAt: '',
            updatedAt: '',
          },
          trigger: {
            id: '',
            customerId: '',
            eventName: createCampaignData.campaignTrigger,
            payload: {
              product_id: '',
              quantity: createCampaignData.campaignTriggerValue,
            },
          },
          qty: 5,
          conditions: [
            {
              key: '',
              operator: '',
              value: '',
            },
          ],
        },
      ],
      status: '',
    };
    console.log(data);
  };
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
  );
};

export default CampaignForm;
