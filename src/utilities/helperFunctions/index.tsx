import { useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks'
import { getAllRules, getSpecificRule } from '../redux/RuleSlice'
import { getRules } from '@/httpClient/rules'
import { useDispatch } from 'react-redux'

export default function ClientOnly({ children }: { children: React.ReactNode }) {
  // State / Props
  const [hasMounted, setHasMounted] = useState(false)

  // Hooks
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Render
  if (!hasMounted) return null

  return <div>{children}</div>
}

export function useTheme(theme: boolean) {
  useEffect(() => {
    if (theme) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])
}

export function getFirstLetter(inputString: string) {
  if (inputString && inputString.length > 0) {
    return inputString.charAt(0)
  } else {
    return null
  }
}

export function formatDateToCustomFormat<T extends string>(dateString: T, format: string): string {
  const dateObject = new Date(dateString)
  const day = dateObject.getDate().toString().padStart(2, '0')
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
  const year = dateObject.getFullYear().toString()

  return format.replace('DD', day).replace('MM', month).replace('YYYY', year)
}

// export const filterRule = async () => {
//   const rules = await getRules()
//   const specificRule = rules.filter((rule: any) => rule.id === 'r10')
//   dispatch(getSpecificRule(specificRule))
// }
