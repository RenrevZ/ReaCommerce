import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";

import ShowSingleCategories from "../view/ShowCategories/ShowSingleCategories.tsx";
import Layout from "../layout/Layout.jsx";
import ShowProduct from "../view/ShowProduct/ShowProduct.tsx";
import LandingPage from "../view/LandingPage/LandingPage.tsx";


const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index  element={ <LandingPage /> } />
        <Route path="product/category/:category" element={<ShowSingleCategories />} />
        <Route path="product/:id" element={<ShowProduct />} />
      </Route>
    )
  );

export {router}