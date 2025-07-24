import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'

export const ServerProviders: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return <HeaderThemeProvider>{children}</HeaderThemeProvider>
}
