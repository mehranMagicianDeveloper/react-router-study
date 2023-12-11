import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Vans from "./pages/vans/Vans";
import Header from "./components/Header";
import Host from "./pages/host/Host";
import Login from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="vans" element={<Vans />} />
        <Route path="host" element={<Host />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
