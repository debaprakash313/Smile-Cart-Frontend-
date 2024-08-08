import React, { useState } from "react";

import { filterNonNull } from "@bigbinary/neeto-cist";
import { Input, NoData, Pagination } from "@bigbinary/neetoui";
import Header from "components/commons/Header";
import PageLoader from "components/commons/PageLoader";
import PageNotFound from "components/commons/PageNotFound";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { Search } from "neetoicons";
import { isEmpty, mergeLeft } from "ramda";
import { useHistory } from "react-router-dom";
import routes from "routes";

import { buildUrl, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import ProductListItem from "./ProductListItem";

const ProductList = () => {
  // const [products, setProducts] = useState([]);
  // const [isLoading, setLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);
  const [searchKey, setSearchKey] = useState("");
  // const debouncedSearchKey = useDebounce(searchKey);
  const queryParams = useQueryParams();
  const { page, pageSize, searchTerm = "" } = queryParams;
  const history = useHistory();

  const productParams = {
    searchTerm,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
  };

  const updateQueryParams = useFuncDebounce(value => {
    const params = {
      page: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      searchTerm: value || null,
    };

    setSearchKey(value);
    history.replace(
      buildUrl(routes.products.productList, filterNonNull(params))
    );
  });

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(
        routes.products.productList,
        mergeLeft(
          {
            page,
            pageSize: DEFAULT_PAGE_SIZE,
          },
          queryParams
        )
      )
    );

  // const fetchProducts = async () => {
  //   try {
  //     const data = await productsApi.fetch({ searchTerm: debouncedSearchKey });
  //     setProducts(data.products);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, [debouncedSearchKey]);

  // const toggleIsInCart = slug =>
  //   setCartItems(prevCartItems =>
  //     prevCartItems.includes(slug)
  //       ? without([slug], cartItems)
  //       : [slug, ...cartItems]
  //   );

  const {
    data: { products = [], totalProductsCount } = {},
    isLoading,
    isError,
  } = useFetchProducts(productParams);
  console.log(products);
  if (isError) {
    return <PageNotFound />;
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col">
      <Header
        shouldShowBackButton={false}
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder="Search Products"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={({ target: { value } }) => {
              updateQueryParams(value);
              setSearchKey(value);
            }}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No Products Found" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(prod => (
            <ProductListItem key={prod.slug} {...prod} />
          ))}
        </div>
      )}
      <div className="mb-5 self-end">
        <Pagination
          count={totalProductsCount}
          navigate={handlePageNavigation}
          pageNo={Number(page) || DEFAULT_PAGE_INDEX}
          pageSize={Number(pageSize) || DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default ProductList;
