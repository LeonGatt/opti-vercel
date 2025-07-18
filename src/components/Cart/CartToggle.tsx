import React from 'react'
import { CartFlyOut } from './Cart'
import { CartToggleIcon } from '@/components/Icon/old/CartIcon'
import { cn } from '@/utilities'
import { useTranslations } from 'next-intl'

export const CartToggle: React.FC = () => {
  const [cartOpen, setCartOpen] = React.useState(false)
  const t = useTranslations('cart')

  return (
    <>
      <div
        className={cn(
          'relative text-right transition-transform duration-300',
          cartOpen ? 'translate-x-[100vw]' : '',
        )}
      >
        <input
          type="checkbox"
          id="cart-flyout-toggle"
          name="cart-flyout-toggle"
          className="hidden"
          checked={cartOpen}
          onChange={() => setCartOpen((oldCartOpen) => !oldCartOpen)}
        />
        <label
          htmlFor="cart-flyout-toggle"
          className="text-foreground cursor-pointer group"
          tabIndex={0}
          aria-label={t('toggle')}
        >
          <CartToggleIcon />
        </label>
      </div>
      <CartFlyOut opened={cartOpen} close={() => setCartOpen(false)} />
    </>
  )
}