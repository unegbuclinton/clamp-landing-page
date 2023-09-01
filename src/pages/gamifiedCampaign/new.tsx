import React from 'react'
import { Form, Input, Button } from 'antd'
import { useRouter } from 'next/router'
import ButtonComponent from '@/components/atoms/button'
import DashboardLayout from '@/components/layouts/dashboardLayout'

const NewGamifiedCampaign = () => {
  const router = useRouter()
  return (
    <DashboardLayout>
      <div className="flex flex-col justify-center w-full">
        <h3 className="text-xl font-bold w-full text-gray-700  mb-8">Gamified Campaign</h3>
        <div className="w-40">
          <ButtonComponent type="button" text="Start" />
        </div>
        <Form></Form>
      </div>
    </DashboardLayout>
  )
}

export default NewGamifiedCampaign
