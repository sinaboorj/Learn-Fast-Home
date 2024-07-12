import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from './pages/home'
import Footer from "./components/footer";
import UserContextProvider from "./context/userContext";
import SignInUp from "./pages/users/signInUp";
import EmailVerify from "./pages/users/emailVerify"
import Dashboard from "./dashboard/dashboard";
import About from "./components/about";
import Analysis from "./pages/analysis/analysis";
import Profile from "./pages/users/profile";
import DropDownMenu from "./components/dropDownMenu";
import PublicContextProvider from "./context/publicContext";

const App = () => {
  return (
    <>
      <UserContextProvider>
        <PublicContextProvider>
        <DropDownMenu />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api/dashboard" element={<Dashboard />} />
            <Route path="/api/about-hossein-zarei" element={<About />} />
            <Route path="/api/login" element={<SignInUp />} />
            <Route path="/api/statistics" element={<Analysis />} />
            <Route path="/api/profile/:userID" element={<Profile /> } />
            <Route path="/api/:userID/mail-verification/:token" element={<EmailVerify />} />
          </Routes>
          <Footer />
          </PublicContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
