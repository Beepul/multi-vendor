import React from 'react'
import Header from '../components/layout/Header'
import Hero from '../components/layout/Hero'
import Footer from '../components/layout/Footer'

const Home = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Footer />
    </div>
  )
}

export default Home