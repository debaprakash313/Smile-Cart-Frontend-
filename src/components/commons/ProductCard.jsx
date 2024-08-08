import React, { useState, memo } from "react";

import { Delete } from "@bigbinary/neeto-icons";
import { Alert, Typography } from "@bigbinary/neetoui";
import useCartItemsStore from "stores/useCartItemsStore";

import ProductQuantity from "./ProductQuantity";

const ProductCard = ({
  slug,
  name,
  mrp,
  offerPrice,
  imageUrl,
  availableQuantity,
}) => {
  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);
  //   const removeCartItem = useCartItemsStore(prop("removeCartItem"));
  const removeCartItem = useCartItemsStore.pickFrom();

  return (
    <div className="neeto-ui-rounded neeto-ui-border-black border p-2">
      <div className="flex w-full items-center space-x-5">
        <img alt={name} height={80} src={imageUrl} width={80} />
        <div className="flex-grow space-y-1">
          <Typography className="mb-2" style="h4" weight="bold">
            {name}
          </Typography>
          <Typography style="body2">MRP: ${mrp}</Typography>
          <Typography style="body2">Offer Price: ${offerPrice}</Typography>
        </div>
        <ProductQuantity {...{ availableQuantity, slug }} />
        <Delete
          className="cursor-pointer"
          height={40}
          width={40}
          onClick={() => setShouldShowDeleteAlert(true)}
        />
        <Alert
          isOpen={shouldShowDeleteAlert}
          submitButtonLabel="Yes,remove"
          title="Remove Item?"
          message={
            <Typography>
              You are removing <strong>{name}</strong> from Cart. Do you want to
              continue?
            </Typography>
          }
          onClose={() => setShouldShowDeleteAlert(false)}
          onSubmit={() => {
            removeCartItem(slug);
            setShouldShowDeleteAlert(false);
          }}
        />
      </div>
    </div>
  );
};

export default memo(ProductCard);
