import React from "react"
import LandingPage from "./pages/LandingPage"
import ApplicantDash from "./pages/ApplicantDash";
import AdminDash from "./pages/AdminDash"
import AboutPage from "./pages/AboutPage";
import Contact from './pages/Contact'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/AppDash" element={<ApplicantDash/>}/>
      <Route path="/AdDash" element={<AdminDash/>}/>
      <Route path="/AboutPage" element={<AboutPage/>}/>
      <Route path="/Contact" element={<Contact/>}/>

      </>
    )
  );
return (
  <>
    <RouterProvider router={router} />
  </>
  )
}

export default App
