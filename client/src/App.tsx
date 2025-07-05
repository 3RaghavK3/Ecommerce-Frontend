import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { ProductDetailPage } from "./pages/ProductDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/product/getinfo/:id" element={<ProductDetailPage />} />
    </Routes>
  );
}

export default App;
