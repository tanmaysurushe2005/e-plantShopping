import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
 
const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
 
  // Convert a cost string like "$15" into a number
  const parseCost = (cost) => parseFloat(String(cost).replace('$', ''));
 
  // Total amount for all items in the cart
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0)
      .toFixed(2);
  };
 
  // Total cost for a single plant (unit price x quantity)
  const calculateTotalCost = (item) => {
    return (parseCost(item.cost) * item.quantity).toFixed(2);
  };
 
  // Total number of plants in the cart
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
 
  // Continue Shopping: go back to the product listing page
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };
 
  // Checkout: feature not built yet
  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };
 
  // Increase quantity by 1
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };
 
  // Decrease quantity by 1; remove the item when it reaches 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };
 
  // Delete the item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };
 
  return (
    <div className="cart-container">
      <h2 className="total-cart-amount">Total Cart Amount: ${calculateTotalAmount()}</h2>
      <p className="total-cart-items">Total Plants: {calculateTotalQuantity()}</p>
 
      {cart.length === 0 && <p className="empty-cart">Your cart is empty.</p>}
 
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Price: {item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
 
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};
 
export default CartItem;
