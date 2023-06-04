import PillButton from "@/components/atoms/pillButton";
import InfoCard from "@/components/molecules/infoCard";
import {
  campaignExpiration,
  campaignOptions,
} from "@/utilities/data/campaignOption";
import { Form, Input, Select } from "antd";
import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { FormInstance } from "antd/lib/form";

interface campaignStepTwo {
  form: FormInstance;
  formData: {
    campaignName: string;
    campaignTrigger: number;
    campaignEarnings: number;
    campaignRedeem: number;
    campaignCashBack: number;
    campaignDiscount: number;
  };
}

const CreateCampaignTwo: React.FC<campaignStepTwo> = () => {
  const { Option } = Select;
  const [rewardType, setRewardType] = useState<number>(0);
  const [activeExpiry, setActiveExpiry] = useState<number>(0);

  return (
    <div className="flex justify-center w-full ">
      <div>
        <p className="text-xs text-dim-grey mb-4">Step 1 of 2</p>
        <h1 className="text-lg font-semibold mb-5">Set trigger & reward</h1>
        <InfoCard label="TRIGGER" description="Every time customer spends">
          <Form.Item
            name={"campaignTrigger"}
            rules={[{ required: true, message: "Add trigger point!" }]}
          >
            <Input
              className="shadow-lg w-[48px] h-[32px] text-right"
              placeholder="1"
            />
          </Form.Item>
        </InfoCard>
        <InfoCard label="EFFECT" description="Customer earns">
          <Form.Item
            name={"campaignEarnings"}
            rules={[{ required: true, message: "Add customer earnings!" }]}
          >
            <Input
              className="shadow-lg w-[48px] h-[32px] text-right"
              placeholder="1"
            />
          </Form.Item>
        </InfoCard>
        <InfoCard
          label="REDEMPTION"
          description="Points needed to redeemed reward"
        >
          <Form.Item
            rules={[{ required: true, message: "Add points for redeeming!" }]}
            name={"campaignRedeem"}
          >
            <Input
              className="shadow-lg w-[48px] h-[32px] text-right"
              placeholder="1"
            />
          </Form.Item>
          <div>
            <p className="font-medium py-4">Reward</p>
            <div className="flex gap-2">
              {campaignOptions?.map(({ text }, idx) => (
                <PillButton
                  onClick={() => setRewardType(idx)}
                  outline={rewardType === idx ? false : true}
                  text={text}
                  key={idx}
                  icon={rewardType === idx ? <AiFillCheckCircle /> : ""}
                />
              ))}
            </div>
          </div>

          {rewardType === 0 && (
            <div>
              <p className="font-medium py-4">Cashback amount</p>

              <div>
                <Form.Item
                  rules={[{ required: true, message: "Add cash back!" }]}
                  name={"campaignCashBack"}
                >
                  <Input
                    className="shadow-lg w-[48px] h-[32px] text-right mr-2"
                    placeholder="5"
                  />
                </Form.Item>
                <span>Dollar</span>
              </div>
            </div>
          )}
          {rewardType === 1 && (
            <div>
              <p className="font-medium py-4">Discount</p>
              <div>
                <Form.Item
                  rules={[
                    { required: true, message: "Add percentage discount!" },
                  ]}
                  name={"campaignDiscount"}
                >
                  <Input
                    className="shadow-lg w-[48px] h-[32px] text-right mr-2"
                    placeholder="5"
                  />
                </Form.Item>
                <span>%</span>
              </div>
            </div>
          )}
          {rewardType === 2 && (
            <div>
              <p className="font-medium py-4">Cashback amount</p>

              <Form.Item name={"campaignPerks"}>
                <Select
                  className="cursor-pointer"
                  style={{ width: 200 }}
                  placeholder="Select Perk"
                >
                  <Option value="jack">Perk1</Option>
                  <Option value="lucy">Perk2</Option>
                  <Option value="tom">Perk3</Option>
                </Select>
              </Form.Item>
            </div>
          )}
          <p className="py-4 text-dim-grey">
            Customer needs to spend at least $35 to earn this reward
          </p>
        </InfoCard>
        <InfoCard label="CAMPAIGN EXPIRATION" subText="Campaign expires in">
          <div className="flex gap-2">
            {campaignExpiration?.map(({ text }, idx) => (
              <PillButton
                onClick={() => setActiveExpiry(idx)}
                outline={activeExpiry === idx ? false : true}
                text={text}
                key={idx}
                icon={activeExpiry === idx ? <AiFillCheckCircle /> : ""}
              />
            ))}
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

export default CreateCampaignTwo;
