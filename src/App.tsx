import React from 'react'
import './App.css'
import Footer from './components/container/Footer'
import Header from './components/container/Header'
import Home from './components/container/Home'

import "primereact/resources/themes/lara-light-indigo/theme.css";  
import "primereact/resources/primereact.min.css";                  
import "primeicons/primeicons.css";   


function App() {

  return (
    <>
      <Header />      
      <Home />
      <Footer />
    </>
  )
}

export default App
