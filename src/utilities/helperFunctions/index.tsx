import { useEffect, useState } from 'react'

export default function ClientOnly({
  children,
}: {
  children: React.ReactNode
}) {
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
