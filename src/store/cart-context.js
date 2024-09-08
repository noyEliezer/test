import React from 'react';

const CartContext = React.createContext({
  user: null,
  class: null,
  token: null,
  allGuides: [],
  setToken: (token) => {},
  setUser: (userDetails) => {},
  setClass: (userClass) => {},
  setAllGuides: (guide) => {},
});

export default CartContext;
