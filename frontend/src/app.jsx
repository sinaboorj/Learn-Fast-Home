import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Shop from "./pages/shop/shop";
import Home from './pages/home'
import Cart from './pages/cart/cart'
import About from "./pages/about";
import Footer from "./components/footer";
import UserContextProvider from "./context/userContext";
import SignInUp from "./pages/users/signInUp";
import EmailVerify from "./pages/users/emailVerify"

const App = () => {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/shop" element={<Shop />} />
          <Route path="/api/cart" element={<Cart />} />
          <Route path="/api/about" element={<About />} />
          <Route path="/api/about" element={<About />} />
          <Route path="/api/login:signup" element={<SignInUp />} />
          <Route path="/api/:userID/mail-verification/:token" element={<EmailVerify />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </>
  );
};

export default App;
