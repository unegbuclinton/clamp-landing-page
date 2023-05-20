import ButtonComponent from "@/components/atoms/button";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import React, { useEffect, useState } from "react";
import CreateCampaignTwo from "./createCampaignSteps/CreateCampaignTwo";
import CreateCampaignOne from "./createCampaignSteps/CreateCampaignOne";
import CreateCampaignSummary from "./createCampaignSummary";
import { Form } from "antd";

interface campaignFormData {
  campaignName: string;
  campaignTrigger: number;
  campaignEarnings: number;
  campaignRedeem: number;
  campaignCashBack: number;
  campaignDiscount: number;
}

const CampaignForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<campaignFormData>({
    campaignName: "InitialCampaign",
    campaignTrigger: 1,
    campaignEarnings: 1,
    campaignRedeem: 1,
    campaignCashBack: 5,
    campaignDiscount: 5,
  });
  const [form] = Form.useForm();
  const steps = [
    {
      component: <CreateCampaignOne form={form} formData={formData} />,
    },
    {
      component: <CreateCampaignTwo form={form} formData={formData} />,
    },
    {
      component: <CreateCampaignSummary />,
    },
  ];
  useEffect(() => {
    // Check if there are saved form values in localStorage
    const savedFormValues = localStorage.getItem("formValues");
    if (savedFormValues) {
      const parsedFormValues = JSON.parse(savedFormValues);
      setFormData(parsedFormValues);
    }
  }, []);
  console.log(formData);
  const handleStepForward = () => {
    form.validateFields().then((values) => {
      const updatedFormData = { ...formData, ...values };
      setFormData(updatedFormData);
      setCurrentStep((prev) => prev + 1);
      localStorage.setItem("formValues", JSON.stringify(updatedFormData));
    });
  };
  const handleStepBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const handleFinish = () => {
    console.log(formData);
  };

  return (
    <DashboardLayout>
      <Form initialValues={formData} form={form} onFinish={handleFinish}>
        <div className=" flex justify-center mb-6">
          <div className="relative max-w-[462px] ">
            <h1 className="text-2xl font-semibold mb-8">
              Create Rewards Campaign
            </h1>
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
                    onClick={handleFinish}
                    type="button"
                    text="Submit"
                    className=" w-full "
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
