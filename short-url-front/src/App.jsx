import { useState } from 'react'
import './index.css'
import UrlForm from './components/UrlForm'
import Analytic from './components/Analytic'
function App() {

  return (
    < >
    <div className='font-serif bg-blue-100 text-blue-950 min-h-screen'>
      <div className='flex justify-center items-center h-32 p-12 w-full'>
       <h1 className='md:text-5xl text-3xl font-medium'>URL Shortner</h1>
      </div>
       <UrlForm/>
       <Analytic/>
    </div>
    </>
  )
}

export default App