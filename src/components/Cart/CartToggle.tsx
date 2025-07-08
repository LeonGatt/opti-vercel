import React from "react";
import { CartFlyOut } from "./Cart";
import { CartToggleIcon } from "@/components/Icon/old/CartIcon";
import { cn } from "@/utilities";

export const CartToggle: React.FC = () => {
  const [cartOpen, setCartOpen] = React.useState(false);

  return (
    <>
      <div
        className={cn(
          "relative text-right transition-transform duration-300",
          cartOpen ? "translate-x-[100vw]" : "",
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
          className="text-neutral-900 dark:text-white cursor-pointer group"
        >
          <CartToggleIcon />
        </label>
      </div>
      <CartFlyOut opened={cartOpen} close={() => setCartOpen(false)} />
    </>
  );
};
