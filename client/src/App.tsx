import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { ProductDetailPage } from "./pages/ProductDetail";
import { Checkout } from "./pages/Checkout";
import { MarketProvider } from "./context/MarketContext";
import { PaymentConfirm } from "./pages/PaymentConfirm";
import { DialogProvider } from "./context/DialogContext";

function App() {
  return (
    <DialogProvider>
    <MarketProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/getinfo/:id" element={<ProductDetailPage />} />
         <Route path="/checkout" element={<Checkout />} />
         <Route path="/payment" element={<PaymentConfirm />} />
      </Routes>
    </MarketProvider>
    </DialogProvider>
  );
}

export default App;
