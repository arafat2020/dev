import React from 'react'
import Header from './_components/Header'
import Hero from './_components/Hero'
import Footer from './_components/Footer'

async function Home() {
  return (
    <div style={{
      background:`url(./bg.jpg)`
    }} className='w-full h-full bg-center bg-no-repeat bg-cover'>
      <div style={{
        background: 'rgba(0, 0, 0, 0.5)'
      }} className='w-full h-full flex flex-col'>
        <Header/>
        <Hero/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home