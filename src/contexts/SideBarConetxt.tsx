import { createContext, ReactNode, useState } from 'react'

interface SideBarContextType {
  isOpen: boolean
  handleIsOpen: () => void
}

interface SideBarProviderProps {
  children: ReactNode
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const SidebarContext = createContext({} as SideBarContextType)

export function SideBarProvider ({ children }: SideBarProviderProps) {
  const [isOpen, setIsOpen] = useState(false)

  function handleIsOpen () {
    setIsOpen(!!isOpen)
  }
  return (
    <SidebarContext.Provider value={{ isOpen, handleIsOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}
