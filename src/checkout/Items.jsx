import React from "react";

import { Button } from "@bigbinary/neetoui";
import { OFFER_PRICE } from "components/constants";
import { cartTotalOf } from "components/utils";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
import { keys } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

import PriceEntry from "./PriceEntry";
import ProductShowCase from "./ProductShowCase";

const Items = ({ isSubmit }) => {
  const { t } = useTranslation();
  const slugs = useCartItemsStore(store => keys(store.cartItems), shallow);
  const { data: products = [] } = useFetchCartProducts(slugs);
  const totalCheckOutPrice = cartTotalOf(products, OFFER_PRICE);

  return (
    <div className="flex h-full flex-col p-10">
      {products.map(prod => (
        <ProductShowCase key={prod.slug} {...prod} />
      ))}
      <div className="mt-5 w-3/4 space-y-3">
        <PriceEntry i18nKey="subtotal" totalPrice={totalCheckOutPrice} />
        <PriceEntry className="text-green-700" i18nKey="deliveryCharges" />
        <div className="neeto-ui-border-black border-t border-dashed" />
        <PriceEntry
          i18nKey="totalPayablePrice"
          totalPrice={totalCheckOutPrice}
        />
      </div>
      <div className="mt-auto flex justify-center">
        <Button
          className="bg-neutral-800 w-1/3 justify-center"
          disabled={isSubmit}
          label={t("confirmOrder")}
          type="submit"
        />
      </div>
    </div>
  );
};

export default Items;
