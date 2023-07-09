import PillButton from '@/components/atoms/pillButton';
import InfoCard from '@/components/molecules/infoCard';
import {
  campaignExpiration,
  campaignOptions,
} from '@/utilities/data/campaignOption';
import type { DatePickerProps } from 'antd';
import { Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { FormInstance } from 'antd/lib/form';
import { DatePicker, Space } from 'antd';
import { triggerOptions } from '@/utilities/data/triggerOptions';
import { useDispatch } from 'react-redux';
import { getRedemptiontype } from '@/utilities/redux/CampaignFormSlice';

interface campaignStepTwo {
  form: FormInstance;
  formData: {
    campaignName: string;
    campaignTrigger: number;
    campaignEarnings: number;
    campaignRedeem: number;
    campaignReward: number;
  };
}

const CreateCampaignTwo: React.FC<campaignStepTwo> = () => {
  const { Option } = Select;
  const [rewardType, setRewardType] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleStartDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleEndDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(dateString);
  };

  const dispatch = useDispatch();
  return (
    <div className='flex justify-center w-full '>
      <div>
        <p className='text-xs text-dim-grey mb-4'>Step 1 of 2</p>
        <h1 className='text-lg font-semibold mb-5'>Set trigger & reward</h1>
        <InfoCard label='TRIGGER'>
          <Form.Item name={'triggerSelect'}>
            <Select
              className='cursor-pointer'
              style={{ width: '100%' }}
              placeholder='Select Trigger'
              onChange={handleChange}
            >
              {triggerOptions?.map(({ value, label }, idx) => (
                <Option key={idx} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {selectedOption ==
            'Transaction is greater than or equal to a particular amount' && (
            <p className='font-bold text-sm'>
              Transaction is greater or equals this amount
            </p>
          )}
          {selectedOption ==
            'Frequency of transaction is equal to or gretaer than a particular number of time' && (
            <p className='font-bold text-sm'>
              Frequency of transaction greater than
            </p>
          )}
          {selectedOption == 'Transaction in a specific location' && (
            <Form.Item>
              <Input
                className='shadow-lg w-[120px] h-[32px]'
                placeholder='Location'
              />
            </Form.Item>
          )}

          <Form.Item
            className='m-0'
            name={'campaignTrigger'}
            rules={[{ required: true, message: 'Add trigger point!' }]}
          >
            <Input
              className='shadow-lg w-[48px] h-[32px] text-right mr-2'
              placeholder='1'
            />
            <span>Dollar</span>
          </Form.Item>
        </InfoCard>

        <InfoCard label='EFFECT' description='Customer earns'>
          <Form.Item
            className='m-0'
            name={'campaignEarnings'}
            rules={[{ required: true, message: 'Add customer earnings!' }]}
          >
            <Input
              className='shadow-lg w-[48px] h-[32px] text-right mr-2'
              placeholder='1'
            />
            <span>Points</span>
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
              name={'campaignRedeem'}
            >
              <Input
                className='shadow-lg w-[48px] h-[32px] text-right mr-2'
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
                    dispatch(getRedemptiontype(type));
                    setRewardType(idx);
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
                  name={'campaignReward'}
                >
                  <Input
                    className='shadow-lg w-[48px] h-[32px] text-right mr-2'
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

          {rewardType === 2 && (
            <div>
              <p className='font-medium py-4'>Cashback amount</p>

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
          <p className='py-4 text-dim-grey'>
            Customer needs to spend at least $35 to earn this reward
          </p>
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
  );
};

export default CreateCampaignTwo;
