import CampaignCard from "@/components/molecules/infoCard";
import { Form, Input } from "antd";
import { FormInstance } from "antd/lib/form";

interface campaignStepOne {
  form: FormInstance;
  formData: {
    campaignName: string;
    campaignTrigger: number;
    campaignEarnings: number;
    campaignRedeem: number;
    campaignReward: number;
  };
}
const CreateCampaignOne: React.FC<campaignStepOne> = () => {
  return (
    <div>
      <CampaignCard description="Campaign name">
        <Form.Item
          name={"campaignName"}
          rules={[
            { required: true, message: "Please input your campaign name!" },
          ]}
        >
          <Input
            className="bg-transparent border-none shadow-none p-0 focus:border focus:border-black"
            placeholder="E.g. Summer loyalty program"
          />
        </Form.Item>
      </CampaignCard>
    </div>
  );
};

export default CreateCampaignOne;
