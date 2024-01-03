import { useState } from "react";
import { ToastAndroid } from "react-native";

export const QueryKeys = {
  all: ["auth"] as const,
  me: () => [...QueryKeys.all, "me"] as const,
};

export const useProviderShop = () => {
  const [shop, setShop] = useState<null | false | Record<string, string>>(
    false
  );

  const handleShoppingCart = (product) => {
    setShop((prev) => {
      const existingProduct = prev[product.id];

      if (existingProduct) {
        return {
          ...prev,
          [product.id]: {
            ...existingProduct,
            quantity: existingProduct.quantity + 1,
          },
        };
      } else {
        return {
          ...prev,
          [product.id]: {
            ...product,
            quantity: 1,
          },
        };
      }
    });

    ToastAndroid.show("Produto adicionado na sacola", ToastAndroid.SHORT);
  };

  const handleProductQuantity = (operation: string, product) => {
    if (product.quantity === 1 && operation === "remove") {
      setShop((prev) => {
        const updatedCart = { ...prev };
        delete updatedCart[product.id];
        return updatedCart;
      });

      ToastAndroid.show("Produto removido da sacola!", ToastAndroid.SHORT);
    } else if (operation === "add") {
      setShop((prev) => {
        return {
          ...prev,
          [product.id]: {
            ...prev[product.id],
            quantity: product.quantity + 1,
          },
        };
      });
    } else {
      setShop((prev) => {
        return {
          ...prev,
          [product.id]: {
            ...prev[product.id],
            quantity: product.quantity - 1,
          },
        };
      });
    }
  };

  return {
    shop,
    handleShoppingCart,
    handleProductQuantity,
  };
};
