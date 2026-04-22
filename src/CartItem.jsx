import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach(item => {
      const cost = parseFloat(item.cost.substring(1)) || 0;
      total += cost * item.quantity;
    });

    return total.toFixed(2);
  };

  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1)) || 0;
    return (cost * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  return (
    <div>
      <h2>Total: ${calculateTotalAmount()}</h2>

      {cart.map(item => (
        <div key={item.name}>
          <img src={item.image} alt={item.name} width="100" />
          <h3>{item.name}</h3>
          <p>{item.cost}</p>

          <div>
            <button onClick={() => handleDecrement(item)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleIncrement(item)}>+</button>
          </div>

          <p>Total: ${calculateTotalCost(item)}</p>

          <button onClick={() => handleRemove(item)}>
            Delete
          </button>
        </div>
      ))}

      <button onClick={handleContinueShopping}>
        Continue Shopping
      </button>
    </div>
  );
};

export default CartItem;