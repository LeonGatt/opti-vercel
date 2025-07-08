import { env } from "@/env";
import type { CartData } from "@/types/cart";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

const CART_QUERY_KEY = "cart";

export const useCartStorage = () => {
  const [value, setValue, removeValue] = useLocalStorage<CartData | null>(
    env.NEXT_PUBLIC_CART_NAME ?? CART_QUERY_KEY,
    null,
  );

  return {
    storedCart: value,
    storedCartId: value?.id || null,
    setStoredCart: (cart: CartData) => setValue(cart),
    removeStoredCart: () => removeValue(),
  };
};

export const useCart = (storeName = "optitrack") => {
  const queryClient = useQueryClient();

  const { storedCart, storedCartId, setStoredCart, removeStoredCart } =
    useCartStorage();

  const baseUrl = `${env.NEXT_PUBLIC_CART_API_URL}/${storeName}`;

  // Create cart mutation
  const createCart = async (): Promise<string> => {
    const response = await fetch(`${baseUrl}/new`);

    if (!response.ok) {
      throw new Error("Failed to create cart");
    }

    const data = await response.json();
    if (data.id) {
      setStoredCart(data);
      return data.id;
    }
    throw new Error("Invalid cart response");
  };

  // Get or create cart ID
  const getOrCreateCartId = async (): Promise<string> => {
    if (storedCartId) {
      return storedCartId;
    }
    return createCart();
  };

  // Fetch cart data
  const fetchCart = async (): Promise<CartData> => {
    const id = await getOrCreateCartId();
    if (!id) {
      throw new Error("No cart ID found");
    }

    // In development, fetch the cart from the server to ensure it's up-to-date
    if (env.NODE_ENV === "development") {
      const cart = await fetch(`${baseUrl}/${id}`);
      if (!cart.ok) {
        throw new Error("Failed to fetch cart");
      }
      const cartData = await cart.json();
      setStoredCart(cartData);
      return cartData;
    }

    if (storedCart) {
      return storedCart;
    }
    try {
      removeStoredCart();
      const newCartId = await getOrCreateCartId();
      const newResponse = await fetch(`${baseUrl}/${newCartId}`);
      return newResponse.json();
    } catch (error) {
      console.error("Error in fetchCart:", error);
      throw error;
    }
  };

  // Main cart query
  const {
    data: cart,
    isLoading,
    error,
    refetch,
  } = useQuery<CartData, Error>({
    queryKey: [CART_QUERY_KEY, storeName],
    queryFn: fetchCart,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  // Add item mutation
  const addItemMutation = useMutation({
    mutationFn: async ({
      itemId,
      quantity = 1,
    }: {
      itemId: number;
      quantity?: number;
    }) => {
      const cartId = await getOrCreateCartId();
      const response = await fetch(
        `${baseUrl}/${cartId}/${itemId}/${quantity}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart_id: cartId, item_id: itemId, quantity }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY, storeName] });
    },
  });

  // Remove item mutation
  const removeItemMutation = useMutation({
    mutationFn: async (itemId: number) => {
      const cartId = await getOrCreateCartId();
      const response = await fetch(`${baseUrl}/${cartId}/item/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY, storeName] });
    },
  });

  // Update quantity mutation
  const updateQuantityMutation = useMutation({
    mutationFn: async ({
      itemId,
      quantity,
    }: {
      itemId: number;
      quantity: number;
    }) => {
      if (quantity <= 0) {
        await removeItemMutation.mutateAsync(itemId);
        return;
      }

      const cartId = await getOrCreateCartId();
      const response = await fetch(
        `${baseUrl}/${cartId}/${itemId}/${quantity}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart_id: cartId, item_id: itemId, quantity }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update item quantity");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY, storeName] });
    },
  });

  // Clear cart mutation
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const cartId = await getOrCreateCartId();
      const response = await fetch(`${baseUrl}/${cartId}/remove`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      localStorage.removeItem("cartId");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY, storeName] });
    },
  });

  const cartIsEmpty = useMemo(
    () => !cart || !cart.items || cart.items?.length === 0,
    [cart],
  );
  return {
    cart: cart || null,
    cartIsEmpty,
    isLoading,
    error,
    addItem: (itemId: number, quantity = 1) =>
      addItemMutation.mutateAsync({ itemId, quantity }),
    removeItem: (itemId: number) => removeItemMutation.mutateAsync(itemId),
    updateQuantity: (itemId: number, quantity: number) =>
      updateQuantityMutation.mutateAsync({ itemId, quantity }),
    clearCart: () => clearCartMutation.mutateAsync(),
    refetchCart: () => refetch(),
  };
};
