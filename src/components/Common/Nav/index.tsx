'use client'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-6 items-center flex-wrap opacity-100 transition-opacity duration-100">
      {navItems.map(({ link }) => (
        <CMSLink
          key={link.label}
          {...link}
          className="no-underline text-softBlack text-xs"
          appearance="plain"
        />
      ))}
    </nav>
  )
}
