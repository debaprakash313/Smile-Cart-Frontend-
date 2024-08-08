import React from "react";

import { Button } from "@bigbinary/neetoui";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { isNil } from "ramda";

import ProductQuantity from "./commons/ProductQuantity";

const AddToCart = ({ slug, availableQuantity }) => {
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);
  const handleClick = event => {
    event.stopPropagation();
    event.preventDefault();
    setSelectedQuantity(1);
  };

  if (isNil(selectedQuantity)) {
    return <Button label="Add to Cart" size="large" onClick={handleClick} />;
  }

  return <ProductQuantity {...{ availableQuantity, slug }} />;
};

export default AddToCart;
