import React, { useRef } from "react";

import { Button, Input, Toastr } from "@bigbinary/neetoui";
import { VALID_COUNT_REGEX } from "components/constants";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import useSelectedQuantity from "hooks/useSelectedQuantity";

import ToolTipWrapper from "./ToolTipWrapper";

const ProductQuantity = ({ slug }) => {
  const { data: product = {} } = useShowProduct(slug);
  const { availableQuantity } = product;
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);
  const parsedSelectedQuantity = parseInt(selectedQuantity) || 0;
  const isNotValidQuantity = parsedSelectedQuantity >= availableQuantity;
  const countInputFocus = useRef(null);

  const handleSetCount = event => {
    const { value } = event.target;
    const isNotValidInputQuantity = parseInt(value) > availableQuantity;

    if (isNotValidInputQuantity) {
      Toastr.error(`Only ${availableQuantity} units are available`, {
        autoClose: 2000,
      });
      setSelectedQuantity(availableQuantity);
      countInputFocus.current.blur();
    } else if (VALID_COUNT_REGEX.test(value)) {
      setSelectedQuantity(value);
    }
  };

  return (
    <div className="neeto-ui-border-black neeto-ui-rounded inline-flex flex-row items-center border">
      <Button
        className="focus-within:ring:0"
        label="-"
        style="text"
        onClick={event => {
          event.stopPropagation();
          event.preventDefault();
          setSelectedQuantity(parsedSelectedQuantity - 1);
        }}
      />
      <Input
        nakedInput
        className="ml-2"
        contentSize="2"
        ref={countInputFocus}
        value={selectedQuantity}
        onChange={handleSetCount}
        onClick={event => {
          event.stopPropagation();
          event.preventDefault();
        }}
      />
      {/* {selectedQuantity} */}
      <ToolTipWrapper
        content="Reached Maximum Units"
        position="top"
        showToolTip={isNotValidQuantity}
      >
        <Button
          className="focus:within:ring-0"
          disabled={isNotValidQuantity}
          label="+"
          style="text"
          onClick={event => {
            event.stopPropagation();
            event.preventDefault();
            setSelectedQuantity(parsedSelectedQuantity + 1);
          }}
        />
      </ToolTipWrapper>
    </div>
  );
};

export default ProductQuantity;
