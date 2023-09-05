import { ColumnsType } from 'antd/es/table'
import { Table } from 'antd'
import GoldBadge from '@/assets/svgs/goldBadge.svg'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/utilities/hooks'
import { getAllCampaign, getSpecificCampaign } from '@/utilities/redux/CampaignFormSlice'
import { RootState } from '@/store'
import { createCampaignInterface } from '@/utilities/types/createCampaign'
import ClientOnly from '@/utilities/helperFunctions'
import { getRules } from '@/httpClient/rules'
import { getSpecificRule } from '@/utilities/redux/RuleSlice'

const CampaignTable = () => {
  const dispatch = useAppDispatch()

  const { allCampaigns } = useAppSelector((state: RootState) => state.campaign)

  useEffect(() => {
    dispatch(getAllCampaign())
  }, [])

  const reversedCampaign = [...(allCampaigns||[])]?.reverse()

  const router = useRouter()
  const columns: ColumnsType<createCampaignInterface> = [
    {
      title: 'CAMPAIGN NAME',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <p className="flex gap-3 items-center">
          <span>
            <GoldBadge />
          </span>
          {text}
        </p>
      ),
    },

    {
      title: 'ALLOCATED POINTS',
      dataIndex: 'allocationPoints',
      key: 'allocationPoints',
      render: (text, record) => <p className="flex flex-col ">{text} </p>,
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <p className="flex flex-col ">
          {(record.adminEvents &&
            record.adminEvents[record.adminEvents.length - 1].eventName !== 'stop-campaign') ||
          !record.adminEvents
            ? text?.toLocaleUpperCase()
            : 'ENDED'}
        </p>
      ),
    },
  ]

  return (
    <ClientOnly>
      <>
        <h2 className="mb-4 text-xl font-semibold">Campaigns</h2>
        <Table
          style={{ fontFamily: 'Inter', cursor: 'pointer' }}
          onRow={(record) => ({
            onClick: () =>
              dispatch(getSpecificCampaign(record.id)).then((data) => {
                if (data.payload) {
                  const id = data.payload.ruleIds?.[0]
                  getRules().then((data) => {
                    const specificRule = data?.find((element: any) => {
                      return element.id === id
                    })

                    dispatch(getSpecificRule(specificRule))
                    router.push(`/loyaltyCampaign/campaign/${record?.id}`)
                  })
                }
              }),
          })}
          columns={columns}
          dataSource={reversedCampaign}
          className="max-w-[85%] pt-4"
        />
      </>
    </ClientOnly>
  )
}

export default CampaignTable
