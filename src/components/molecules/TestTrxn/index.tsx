import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Typography } from 'antd'
import { v4 as uuidv4 } from 'uuid'

const { Title } = Typography

const randomAmount = () => Math.floor(Math.random() * 1000 + 1)
const randomDescription = () => `Test Trxn ${Math.floor(Math.random() * 1000 + 1)}`

const TriggerTestTransaction = () => {
  const [form] = Form.useForm()
  const [initialValues, setInitialValues] = useState({
    customerId: uuidv4(),
    trxnAmount: randomAmount(),
    description: randomDescription(),
    referenceId: uuidv4(),
  })

  // Update initial values after each submission
  const onFinish = (values: Record<string, string>) => {
    console.log('Received values:', values)
    setInitialValues({
      customerId: uuidv4(),
      trxnAmount: randomAmount(),
      description: randomDescription(),
      referenceId: uuidv4(),
    })
  }

  // Set new initial values to form
  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])

  return (
    <div>
      <Title>Trigger Test Transaction</Title>
      <Form form={form} name="transaction_form" initialValues={initialValues} onFinish={onFinish}>
        <Form.Item
          label="Customer ID"
          name="customerId"
          rules={[{ required: true, message: 'Please input the Customer ID!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Transaction Amount"
          name="trxnAmount"
          rules={[{ required: true, message: 'Please input the Transaction Amount!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the Description!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Reference ID"
          name="referenceId"
          rules={[{ required: true, message: 'Please input the Reference ID!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default TriggerTestTransaction
