import React from "react";

import { Button, Typography } from "@bigbinary/neetoui";
import AddToCart from "components/AddToCart";
import Header from "components/commons/Header";
import PageLoader from "components/commons/PageLoader";
import PageNotFound from "components/commons/PageNotFound";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { isNotNil } from "ramda";
import { useParams } from "react-router-dom";
import routes from "routes";

import Carousel from "./Carousel";

const Product = () => {
  // const [product, setProduct] = useState({});
  // const [isLoading, setLoading] = useState(true);
  const { slug } = useParams();
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  // const fetchProduct = async () => {
  //   try {
  //     const res = await productsApi.show(slug);
  //     console.log(res);
  //     setProduct(res);
  //   } catch (error) {
  //     console.log(error);
  //     return <PageNotFound />;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProduct();
  // }, []);

  const { data: product = {}, isLoading, isError } = useShowProduct(slug);

  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrls,
    imageUrl,
    availableQuantity,
  } = product;
  const discountPercentage = (((mrp - offerPrice) / mrp) * 100).toFixed(1);
  if (isError) {
    return <PageNotFound />;
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="px-6 pb-6">
      <Header title={name} />
      <div className="flex-gap-4 mt-16">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
      </div>
      <div className="w-3/5 space-y-4">
        <Typography>{description}</Typography>
        <Typography>MRP: {mrp}</Typography>
        <Typography className="font-semibold">
          Offer Price:{offerPrice}
        </Typography>
        <Typography className="font-semibold text-green-600">
          {discountPercentage}% off
        </Typography>
        <div className="flex space-x-10">
          <AddToCart {...{ availableQuantity, slug }} />
          <Button
            className="bg-neutral-800 hover:bg-neutral-950"
            label="Buy Now"
            size="large"
            to={routes.checkout}
            onClick={() => setSelectedQuantity(selectedQuantity || 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
