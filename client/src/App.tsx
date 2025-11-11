import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { ProductDetailPage } from "./pages/ProductDetail";
import { Checkout } from "./pages/Checkout";
import { MarketProvider } from "./context/MarketContext";
import { PaymentConfirm } from "./pages/PaymentConfirm";
import { DialogProvider } from "./context/DialogContext";
import { PastOrders } from "./pages/Pastorders";
import { Cartbuilder } from "./components/cartbuilder";

function App() {
  return (
    <DialogProvider>
    <MarketProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/getinfo/:id" element={<ProductDetailPage />} />
         <Route path="/checkout" element={<Checkout />} />
         <Route path="/payment" element={<PaymentConfirm />} />
         <Route path="/pastOrders" element={<PastOrders/>} />
         <Route path="/orderid/:orderId" element={<Cartbuilder/>} />
       
      </Routes>
    </MarketProvider>
    </DialogProvider>
  );
}

export default App;
