import { useState } from 'react';
import CartContext from './cart-context';

const CartProvider = (props) => {
  const [userDetails, setUserDetails] = useState(null);
  const [userClassDetails, setUserClassDetails] = useState(null);
  const [tokenDetails, setTokenDetails] = useState(null);
  const [allGuides, setAllGuides] = useState([]);

  const userHandler = (userDetails) => {
    setUserDetails(userDetails);
  };

  const tokenHandler = (token) => {
    setTokenDetails(token);
  };

  const userClassHandler = (userClassDetails) => {
    setUserClassDetails(userClassDetails);
  };

  const currentGuideHandler = (guide) => {
    setAllGuides(guide);
  };

  const cartContext = {
    user: userDetails,
    class: userClassDetails,
    token: tokenDetails,
    allGuides: allGuides,
    setUser: userHandler,
    setToken: tokenHandler,
    setClass: userClassHandler,
    setAllGuides: currentGuideHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
