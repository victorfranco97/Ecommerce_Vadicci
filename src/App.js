import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { light } from "@material-ui/core/styles/createPalette";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  // const [darkMode, setDarkMode] = useState(false);

  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });
  // const cambiarTema = () => !setDarkMode;

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);
      console.log("a ver el orden si llego", incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <div>
          <Navbar totalItems={cart.total_items} />
          <Switch>
            <Route exact path="/">
              <Products products={products} onAddToCart={handleAddToCart} />
            </Route>
            <Route exact path="/carrito">
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            </Route>

            <Route exact path="/checkout">
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
