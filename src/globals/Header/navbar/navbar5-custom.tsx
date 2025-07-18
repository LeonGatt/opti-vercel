'use client'

import { MenuIcon } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { Icon } from '@/components/Icon'
import { cn } from '@/utilities/cn'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import type { Header as HeaderType } from '@/payload-types'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Link from 'next/link'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { Logo } from '@/components/Logo/Logo'
import { CartToggle } from '@/components/Cart/CartToggle'
import { usePathname } from 'next/navigation'

type HeaderItemLink = Extract<NonNullable<HeaderType['items']>[number], { blockType: 'link' }>['link']

const isActivePageLink = (pathname: string, link: HeaderItemLink) => {
  const pathnameWithoutQuery = pathname.split('?')[0]
  const pathnameWithoutTrailingSlash = pathnameWithoutQuery.replace(/\/$/, '')

  if (pathname === '/') {
    return false
  }
  
  let linkUrl: string = ''
  if (link.type === 'reference' && link.reference?.value) {
    if (typeof link.reference.value === 'string') {
      linkUrl = `/${link.reference.value}`
    } else {
      linkUrl = `/${link.reference.value.slug}`
    }
  }
  
  const linkWithoutQuery = linkUrl.split('?')[0]
  const linkWithoutTrailingSlash = linkWithoutQuery.replace(/\/$/, '')

  return pathnameWithoutTrailingSlash === linkWithoutTrailingSlash
}

/*
  In this file there are many custom values - styling colors etc. The reason behind this is that we want to be as close as possible to the original design.
  We will redesign the navbar in the future.
*/
const Navbar5: React.FC<{
  header: HeaderType
  publicContext: PublicContextProps
}> = ({ header, publicContext }) => {
  const pathname = usePathname()

  return (
    <section className="h-16 z-50 bg-[#f1f1f1] text-foreground overflow-hidden dark:bg-[#303030]">
      <nav className="h-full mx-auto max-w-[290px] sm:max-w-[450px] md:max-w-[718px] lg:max-w-[910px] xl:max-w-[1150px] 2xl:max-w-[1150px] flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="lg:hidden h-6 w-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground w-10 h-10 p-0 [&_svg]:size-10 leading-1 -m-2">
                <MenuIcon strokeWidth={1} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="max-h-screen overflow-scroll bg-[#f1f1f1] dark:bg-[#303030] flex flex-col justify-between px-10 py-32">
              <SheetHeader className="hidden">
                <SheetTitle>
                  <div className="flex items-center">
                    <Link href="/">
                      <Logo />
                    </Link>
                  </div>
                </SheetTitle>
              </SheetHeader>
              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-6">
                <Accordion type="single" collapsible className="flex flex-col gap-1">
                  {header.items?.map((item) => {
                    if (item.blockType === 'link') {
                      const isActive = isActivePageLink(pathname, item.link)
                      return (
                        <div key={item.id} className="flex flex-col">
                          <CMSLink
                            publicContext={publicContext}
                            {...item.link}
                            className={cn(
                              "font-light text-2xl",
                              isActive && "font-bold"
                            )}
                          />
                        </div>
                      )
                    } else if (item.blockType === 'sub') {
                      return (
                        <AccordionItem
                          key={item.id}
                          value={item.id || item.label}
                          className="border-b-0"
                        >
                          <AccordionTrigger className="mb-4 py-0 font-medium hover:no-underline">
                            <span className="inline-flex">
                              {item.icon && <Icon className="mr-2 h-6" icon={item.icon} />}
                              {item.label}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="mt-2">
                            {item.subitems.map((subitem) => (
                              <CMSLink
                                publicContext={publicContext}
                                key={subitem.id}
                                className={cn(
                                  'flex select-none gap-4 rounded-md p-3 leading-none outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                                )}
                                {...subitem.link}
                                label=""
                                iconBefore={undefined}
                                iconAfter={undefined}
                              >
                                {subitem.link.iconBefore && (
                                  <Icon icon={subitem.link.iconBefore} />
                                )}
                                <div>
                                  <div className="text-sm font-semibold">
                                    {subitem.link.label}
                                  </div>
                                  <p className="text-sm leading-snug text-muted-foreground">
                                    {subitem.Description}
                                  </p>
                                </div>
                              </CMSLink>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      )
                    }
                  })}
                </Accordion>
              </div>
              {/* Mobile Buttons */}
              <div className="flex flex-col gap-2">
                {header?.buttons?.map((btn) => (
                  <CMSLink
                    publicContext={publicContext}
                    key={btn.id}
                    {...btn.link}
                    className="w-fit text-2xl h-11 font-light"
                  />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <NavigationMenu className="hidden lg:block z-50">
          <NavigationMenuList className="gap-[30px] xl:gap-10">
            {header.items?.map((item) => {
              if (item.blockType === 'link') {
                const isActive = isActivePageLink(pathname, item.link)
                return (
                  <NavigationMenuItem key={item.id} className="m-0">
                    <CMSLink
                      publicContext={publicContext}
                      key={item.id}
                      {...item.link}
                      className={cn(
                        'text-foreground',
                        navigationMenuTriggerStyle,
                        buttonVariants({ variant: 'ghost' }),
                        'text-[13px]/[13px] font-normal h-6 p-0 hover:text-button-primary hover:bg-transparent',
                        isActive && 'font-bold',
                      )}
                    />
                  </NavigationMenuItem>
                )
              } else if (item.blockType === 'sub') {
                return (
                  <NavigationMenuItem key={item.id} className="text-muted-foreground">
                    <NavigationMenuTrigger className="bg-transparent">
                      {item.icon && <Icon className="mr-2 h-6" icon={item.icon} />}
                      <span>{item.label}</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-80 p-3">
                        {item.subitems.map((subitem) => (
                          <NavigationMenuLink asChild key={subitem.id}>
                            <li>
                              <CMSLink
                                publicContext={publicContext}
                                className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                {...subitem.link}
                                label=""
                                iconBefore={undefined}
                                iconAfter={undefined}
                              >
                                {subitem.link.iconBefore && (
                                  <Icon
                                    icon={subitem.link.iconBefore}
                                    className="size-5 shrink-0"
                                  />
                                )}
                                <div>
                                  <div className="text-sm font-semibold">
                                    {subitem.link.label}
                                  </div>
                                  <p className="text-sm leading-snug text-muted-foreground">
                                    {subitem.Description}
                                  </p>
                                </div>
                              </CMSLink>
                            </li>
                          </NavigationMenuLink>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              }
            })}
            {header?.buttons?.map((btn) => (
              <NavigationMenuItem key={btn.id}>
                <CMSLink
                  publicContext={publicContext}
                  {...btn.link}
                  size="sm"
                  className="text-[13px] text-foreground font-normal px-2 h-[25px] leading-[25px] rounded-sm transition-colors duration-300 hover:bg-button-primary hover:text-white hover:border-button-primary"
                />
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2 z-50">
          <CartToggle />
        </div>
      </nav>
    </section>
  )
}

export default Navbar5
