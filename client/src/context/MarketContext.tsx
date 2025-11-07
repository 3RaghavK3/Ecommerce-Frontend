// @ts-nocheck
import React, { createContext, useState, useRef } from "react";

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
        setcart
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}
