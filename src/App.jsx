import Product from "components/Product/Product";
import ProductList from "components/ProductList/ProductList";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

import "./App.css";
import Cart from "./cart/Cart";
import Checkout from "./checkout/Checkout";
// import Cart from "./cart/Cart";
// import Checkout from "./checkout/Checkout";
// eslint-disable-next-line import/extensions

const App = () => (
  <Switch>
    <Route exact component={ProductList} path={routes.products.productList} />
    <Route exact component={Product} path={routes.products.productListItem} />
    <Redirect exact from={routes.root} to={routes.products.productList} />
    {/* <Route exact component={PageNotFound} path="*" /> */}
    <Route exact component={Cart} path={routes.cart} />
    <Route exact component={Checkout} path={routes.checkout} />
  </Switch>
);

export default App;
