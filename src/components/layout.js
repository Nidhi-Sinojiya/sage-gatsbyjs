import React from "react"
import Footer from "./Footer"
import Header from "./Header"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <div className="hidden gallery-slider-full !mt-0 pt-0 py-60 lgscreen:py-40 !mt-0 py-90"></div>
    </>
  )
}

export default Layout
