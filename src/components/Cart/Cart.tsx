import { useCart } from "@/hooks/cart/useCart";
import type React from "react";
import { CartItem } from "./CartItem";
import Link from "next/link";
import { Button } from "../ui/button";
import { CartIcon } from "@/components/Icon/old/CartIcon";
import { usePriceFormat } from "@/hooks/useNumberFormat";
import { useTranslations } from "next-intl";
import { cn } from "@/utilities";

interface CartFlyOutProps {
  opened: boolean;
  close: () => void;
}

export const CartFlyOut: React.FC<CartFlyOutProps> = ({ opened, close }) => {
  const { cart, isLoading, error, clearCart, cartIsEmpty } = useCart();
  const t = useTranslations("cart");

  const { formatPrice } = usePriceFormat();

  return (
    <div
      className={cn(
        "fixed right-0 top-0 z-50 flex h-full w-full flex-col font-normal shadow-lg transition-all duration-300 md:w-[321px] md:border-l md:border-black/20 bg-secondary",
        "transform translate-x-full",
        opened
          ? "pointer-events-auto transform translate-x-0"
          : "pointer-events-none",
      )}
    >
      <div className="relative p-4 text-black">
        <div className="text-2xl font-bold cursor-default inline-block">
          {t("title")}
        </div>
        <button
          className="absolute top-5 right-5 text-black cursor-pointer"
          onClick={close}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              close();
            }
          }}
          tabIndex={0}
          type="button"
        >
          <CartIcon />
        </button>
        <div className="mt-2 text-sm font-normal flex items-center gap-2">
          {!isLoading && !error && !cartIsEmpty && (
            <>
              <span>{formatPrice(cart?.total_price)}</span>
              <span className="text-gray-500  before:content-['|'] before:mx-2">
                {cart?.total_item_count ?? 0} item
                {cart?.total_item_count !== 1 ? "s" : ""}
              </span>
            </>
          )}
        </div>
        {!cartIsEmpty && (
          <Button
            variant="outline"
            className="mt-2 w-full border-button-primary text-button-primary hover:text-button-primary"
            asChild
          >
            <Link href="/checkout" title={t("checkout")} onClick={close}>
              {t("checkout")}
            </Link>
          </Button>
        )}
      </div>
      <div className="flex-grow overflow-y-auto border-t border-gray-200 ">
        <div className="px-4 py-2 h-full">
          {cartIsEmpty ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm text-gray-500  text-center">
                {isLoading ? t("loading") : t("empty_description")}
              </p>
            </div>
          ) : (
            cart?.items?.map((item) => <CartItem key={item.id} {...item} />)
          )}
        </div>
      </div>
      {!cartIsEmpty && (
        <div className="flex flex-col justify-center min-h-[49px] border-t border-gray-200  text-sm">
          <div className="flex justify-evenly py-2">
            <Button variant="link" onClick={() => clearCart()}>
              {t("clear")}
            </Button>
            <Button variant="link">{t("view")}</Button>
          </div>
        </div>
      )}
    </div>
  );
};
