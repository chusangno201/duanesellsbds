import { Routes, Route, Outlet } from "react-router-dom";

import Header from "./component/Header";
import Home from "./component/Home";
import Stats from "./component/Stats";
import ContactForm from "./component/ContactForm";
import Footer from "./component/Footer";
import BuyHome from "./Buyhous/BuyHome"

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
    <>
     <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/duane-sells" element={<DuaneSells />} />
        <Route path="/component" element={<Stats />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/mechelle" element={<Mechelle />} />
      </Route>
      
        <Route path="/buyhome" element={<BuyHome />} />
    </Routes>



    </>
  );
}

export default App;