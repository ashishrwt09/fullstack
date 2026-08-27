import { useState } from "react";

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
    phone: "",
    paymentMethod: "COD",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed successfully for ${formData.name}!`);
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2>Checkout Details</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="address"
        placeholder="Shipping Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <select
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
      >
        <option value="COD">Cash on Delivery (COD)</option>
        <option value="UPI">UPI / Online</option>
        <option value="Card">Credit/Debit Card</option>
      </select>
      <button type="submit" className="submit-btn">Place Order</button>
    </form>
  );
}