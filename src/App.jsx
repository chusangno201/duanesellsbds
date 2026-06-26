import { Routes, Route, Outlet } from "react-router-dom";

import Header from "./component/Header";
import Home from "./component/Home";
import Stats from "./component/Stats";
import ContactForm from "./component/ContactForm";
import Footer from "./component/Footer";

import BuyHome from "./Buyhous/BuyHome";
import SellHome from "./Buyhous/SellHome";
import BuyLand from "./Buyhous/BuyLand";
import SellBuy from "./Buyhous/SellBuy";

import Mechelle from "./pages/duane-sells/Mechelle";
import DuaneSells from "./pages/duane-sells/Duane";

import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/duane-sells" element={<DuaneSells />} />
        <Route path="/component" element={<Stats />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/mechelle" element={<Mechelle />} />

        <Route path="/buyhome" element={<BuyHome />} />
        <Route path="/sellhome" element={<SellHome />} />
        <Route path="/buyland" element={<BuyLand />} />
        <Route path="/sellbuy" element={<SellBuy />} />

        {/* Route viết hoa nếu menu cũ đang dùng */}
        <Route path="/BuyHome" element={<BuyHome />} />
        <Route path="/SellHome" element={<SellHome />} />
        <Route path="/BuyLand" element={<BuyLand />} />
        <Route path="/SellBuy" element={<SellBuy />} />
      </Route>
    </Routes>
  );
}

export default App;