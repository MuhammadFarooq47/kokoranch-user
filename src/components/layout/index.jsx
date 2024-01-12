import React from 'react'
import Header from '../header'
// footer   
import Footer from '../footer'
export default function Layout({children}) {
  return (
      <>
    <Header />
    {children}
    <Footer />
      </>
  )
}
