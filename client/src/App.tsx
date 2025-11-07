import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { ProductDetailPage } from "./pages/ProductDetail";
import { Checkout } from "./pages/Checkout";
import { MarketProvider } from "./context/MarketContext";

function App() {
  return (
    <MarketProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/getinfo/:id" element={<ProductDetailPage />} />
         <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </MarketProvider>
  );
}

export default App;
