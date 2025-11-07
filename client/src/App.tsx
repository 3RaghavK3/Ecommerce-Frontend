import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { ProductDetailPage } from "./pages/ProductDetail";
import { MarketProvider } from "./context/MarketContext";

function App() {
  return (
    <MarketProvider>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/product/getinfo/:id" element={<ProductDetailPage />} />
    </Routes>
    </MarketProvider>
  );
}

export default App;
