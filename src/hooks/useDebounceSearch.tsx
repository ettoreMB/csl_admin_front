import { useEffect, useState } from 'react'

export default function UseDebounce (value: any, delay: number) {
  const [debaunceValue, setDebaunceValue] = useState<any>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebaunceValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return { debaunceValue }
}
