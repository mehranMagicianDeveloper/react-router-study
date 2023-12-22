import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Vans, { loader as vansLoader } from "./pages/vans/Vans";
import Login from "./pages/login/Login";
import VanDetail from "./pages/vans/VanDetail";
import Layout from "./components/Layout";
import Income from "./pages/host/Income";
import Reviews from "./pages/host/Reviews";
import Dashboard from "./pages/host/Dashboard";
import HostLayout from "./pages/host/HostLayout";
import HostVans from "./pages/host/HostVans";
import HostVanDetail from "./pages/host/HostVanDetail";
import HostVanInfo from "./pages/host/HostVanInfo";
import HostVanPhoto from "./pages/host/HostVanPhoto";
import HostVanPricing from "./pages/host/HostVanPricing";
import NotFound from "./pages/not-found/NotFound";
import Error from "./components/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      {/* vans path https://dmain.net/vans */}
      {/* <Route path="vans">
            <Route index element={<Vans />} />
            <Route path=":id" element={<VanDetail />} />
          </Route> */}

      <Route path="vans" element={<Vans />} loader={vansLoader} />
      <Route path="vans/:id" element={<VanDetail />} />

      {/* host path https://dmain.net/host/ */}
      <Route path="host" element={<HostLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="income" element={<Income />} />

        {/* host vans path https://dmain.net/host/vans */}
        <Route path="vans" element={<Outlet />}>
          <Route index element={<HostVans />} />

          {/* host van path https://dmain.net/host/vans/id/ */}
          <Route path=":id" element={<HostVanDetail />}>
            <Route index element={<HostVanInfo />} />
            <Route path="photos" element={<HostVanPhoto />} />
            <Route path="pricing" element={<HostVanPricing />} />
          </Route>
        </Route>
        <Route path="reviews" element={<Reviews />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
