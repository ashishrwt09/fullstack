import { useState } from "react";
import { products } from "./data/products";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <Navbar
        cartCount={totalCartCount}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
      />

      <main className="container">
        <ProductList products={products} onAddToCart={handleAddToCart} />

        {isCartOpen && (
          <div className="drawer">
            <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
            {cart.length > 0 && <CheckoutForm />}
          </div>
        )}
      </main>
    </div>
  );
}