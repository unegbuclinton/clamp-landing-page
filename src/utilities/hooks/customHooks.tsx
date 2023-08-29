// import { useEffect } from 'react'
// import {
//   getCampaignData,
//   setCampaignEndDate,
//   setCampaignStartDate,
// } from '../redux/CampaignFormSlice'
// import dayjs from 'dayjs'

// export function useFormInitialization(
//   mode,
//   specificCampaign,
//   specificRule,
//   dispatch
// ) {
//   useEffect(() => {
//     if (mode === 'edit') {
//       localStorage.removeItem('formValues')
//       const data = {
//         campaignName: specificCampaign?.name,
//         earningType: 'Fixed',
//         campaignTriggerValue: specificRule?.conditions?.[0]?.value,
//         // campaignEarnings: specificRule?.assetQty,
//         campaignRedeem:
//           specificCampaign.redemptionRules?.[0]?.assetConditions[0]?.value,
//         campaignTrigger: specificRule?.conditions?.[0]?.key,
//         cashbackOption: 'percentage',
//         campaignReward: 10,
//       }
//       dispatch(getCampaignData(data))
//       dispatch(setCampaignStartDate(dayjs(specificCampaign.startDate)))
//       dispatch(setCampaignEndDate(dayjs(specificCampaign.endDate)))
//       // Update local storage synchronously
//       localStorage.setItem('formValues', JSON.stringify(data))
//       const savedFormValues = localStorage.getItem('formValues')
//       console.log(savedFormValues)
//     }
//   }, [mode, specificCampaign, specificRule, dispatch])
// }

// export default useFormInitialization
