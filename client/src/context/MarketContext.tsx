// @ts-nocheck
import React, { createContext, useState, useRef, useContext } from "react";
import { DialogContext } from "./DialogContext";

export const MarketContext = createContext();

export function MarketProvider({ children }) {
  const [market, setmarket] = useState([]);
  const [totalProducts, settotalproducts] = useState(0);
  const totalPages = useRef(null);
  const limit = Number(import.meta.env.VITE_PER_PAGE) || 9;
  const [categoryItems, setCategoryItems] = useState([]);
  const [page, setpage] = useState(1);
  const [sort, setSort] = useState("default");
  const [cart, setcart] = useState([]);
  const {SucessDialog}=useContext(DialogContext);
  const [open, setOpen] = useState(false);
  
  const AddToCart = (productinfo,quantity=1) => {
    const cart=JSON.parse(localStorage.getItem("CART") || "{}")
    const existingId = (cart.items || []).findIndex((product) => product.id == productinfo.id);

    if (existingId === -1) {
      cart.items = [...(cart.items || []), { ...productinfo, quantity, subtotal: quantity * productinfo.price }];

    } else {
      cart.items[existingId].quantity += quantity;
      cart.items[existingId].subtotal = cart.items[existingId].quantity * cart.items[existingId].price;
     
      
    }
    cart.totalq = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    cart.totalbill = cart.items.reduce((sum, i) => sum + i.subtotal, 0);
    localStorage.setItem("CART", JSON.stringify(cart));
    
    SucessDialog({ msg: "Added to cart!", desc: `${quantity} x ${productinfo.title} has been added. You can review your cart now.`  });
    
  };
  return (
    <MarketContext.Provider
      value={{
        market,
        setmarket,
        totalProducts,
        settotalproducts,
        totalPages,
        limit,
        categoryItems,
        setCategoryItems,
        page,
        setpage,
        sort,
        setSort,
        cart, 
        setcart,
        AddToCart,
        open,
        setOpen
        
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}
