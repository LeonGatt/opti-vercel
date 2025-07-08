import Link from "next/link";
import { useCart } from "@/hooks/cart/useCart";
import type { CartItem as CartItemType } from "@/types/cart";
import { X as CloseIcon } from "lucide-react";
import { usePriceFormat } from "@/hooks/useNumberFormat";
import { useTranslations } from "next-intl";

export const CartItem: React.FC<CartItemType> = ({
  id,
  url = "/",
  thumbnail = "/placeholder-image.png",
  name = "",
  part_number_with_options = "",
  options = [],
  quantity = 1,
  unit_price = 0,
  total_price = 0,
}) => {
  const { removeItem, updateQuantity } = useCart();
  const { formatPrice } = usePriceFormat();

  const t = useTranslations("cart")

  return (
    <div className="flex relative py-5 text-sm border-t first:border-t-0 border-gray-200  last:mb-20">
      <Link href={url}>
        <div className="w-10 h-20 relative mr-2">
          {/* Next image */}
          <img
            className="w-full h-auto object-contain object-top"
            src={thumbnail}
            alt={name}
            width={110}
            height={110}
          />
        </div>
      </Link>
      <div className="flex-1">
        <Link
          href={url}
          className="block mr-9 text-button-primary font-medium break-words text-[13px]"
        >
          {name}
        </Link>
        <div className="text-[11px] mb-2 text-gray-500">
          {t("product.partNumber")}: {part_number_with_options}
        </div>
        <div className="mb-5 text-gray-500 text-xs">
          <ul className="list-disc pl-4">
            {options?.map((option) => (
              <li key={option.id}>{option.item_name}</li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 text-gray-700  justify-between">
          <div className="flex items-center">
            {/* Shad cn input */}
            <input
              data-itemid="1843336"
              className="w-12 h-6 border border-black/20 rounded text-center text-black  shadow-inner appearance-none"
              pattern="[1-9][0-9]{0,4}"
              name="quantity"
              type="number"
              min="1"
              max="9999"
              value={quantity}
              onChange={(e) => {
                const newQuantity = Number.parseInt(e.target.value, 10);
                if (newQuantity > 0) {
                  updateQuantity(id, newQuantity);
                } else {
                  removeItem(id);
                }
              }}
            />
            <span className="before:content-['×'] before:mx-1 text-gray-500 text-[13px]">
              {formatPrice(unit_price)}
            </span>
          </div>
          {/* Add rounding */}
          <span className="text-black text-[13px]">
            {formatPrice(total_price)}
          </span>
        </div>
      </div>
      <button
        type="button"
        className="absolute top-4 right-0 text-button-primary  cursor-pointer"
        onClick={() => removeItem(id)}
        aria-label={t("items.remove")}
      >
        <CloseIcon className="w-4 h-4" />
      </button>
    </div>
  );
};
