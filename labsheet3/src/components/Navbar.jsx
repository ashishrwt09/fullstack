export default function Navbar({ cartCount, toggleCart }) {
  return (
    <nav className="navbar">
      <h2>TechStore</h2>
      <button className="cart-btn" onClick={toggleCart}>
        🛒 Cart <span className="badge">{cartCount}</span>
      </button>
    </nav>
  );
}